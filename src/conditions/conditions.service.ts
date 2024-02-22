import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConditionsEntity } from './conditions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

interface CsvRow {
  [key: string]: string;
  diagnostic_metrics: string;
}

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(ConditionsEntity)
    private conditionsRepository: Repository<ConditionsEntity>,
    private configService: ConfigService,
  ) {}

  async getAll(): Promise<ConditionsEntity[]> {
    return this.conditionsRepository.find();
  }

  parse(): Promise<void> {
    const results: CsvRow[] = [];

    const newResult: ConditionsEntity[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(this.configService.get('CONDITIONS_PATH'))
        .pipe(csv())
        .on('data', (data: CsvRow) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            const item = this.conditionsRepository.create({
              name: row[Object.keys(row)[0]],
              diagnostic_metrics: row.diagnostic_metrics,
            });
            newResult.push(item);
          }
          await this.conditionsRepository.save(newResult);
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
