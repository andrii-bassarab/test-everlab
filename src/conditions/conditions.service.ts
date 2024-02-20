import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConditionsEntity } from './conditions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

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

  parse() {
    const results = [];

    const newResult = [];

    fs.createReadStream(this.configService.get('CONDITIONS_PATH'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const el of results) {
          const item = this.conditionsRepository.create({
            name: el[Object.keys(el)[0]],
            diagnostic_metrics: el.diagnostic_metrics,
          });
          newResult.push(item);
        }
        return this.conditionsRepository.save(newResult);
      });
  }
}
