import { Injectable } from '@nestjs/common';
import { DiagnosticsEntity } from './diagnostics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

interface CsvRow {
  [key: string]: string;
  diagnostic_groups: string;
  diagnostic_metrics: string;
}

@Injectable()
export class DiagnosticsService {
  constructor(
    @InjectRepository(DiagnosticsEntity)
    private diagnosticsRepository: Repository<DiagnosticsEntity>,
    private configService: ConfigService,
  ) {}

  async getAll(): Promise<DiagnosticsEntity[]> {
    return this.diagnosticsRepository.find();
  }

  async parse(): Promise<void> {
    const results: CsvRow[] = [];

    const newResult: DiagnosticsEntity[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(this.configService.get('DIAGNOSTICS_PATH'))
        .pipe(csv())
        .on('data', (data: CsvRow) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            const item = this.diagnosticsRepository.create({
              name: row[Object.keys(row)[0]],
              diagnostic_groups: row.diagnostic_groups,
              diagnostic_metrics: row.diagnostic_metrics,
            });
            newResult.push(item);
          }
          await this.diagnosticsRepository.save(newResult);
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
