import { Injectable } from '@nestjs/common';
import { DiagnosticMetricsEntity } from './diagnostic_metrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

interface CsvRow {
  [key: string]: string;
  oru_sonic_codes: string;
  diagnostic: string;
  diagnostic_groups: string;
  oru_sonic_units: string;
  units: string;
  min_age: string;
  max_age: string;
  gender: string;
  standard_lower: string;
  standard_higher: string;
  everlab_lower: string;
  everlab_higher: string;
}

@Injectable()
export class DiagnosticMetricsService {
  constructor(
    @InjectRepository(DiagnosticMetricsEntity)
    private diagnosticMetricsRepository: Repository<DiagnosticMetricsEntity>,
    private configService: ConfigService,
  ) {}

  async getAll(): Promise<DiagnosticMetricsEntity[]> {
    return this.diagnosticMetricsRepository.find();
  }

  async parse(): Promise<void> {
    const results: CsvRow[] = [];

    const newResult: DiagnosticMetricsEntity[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(this.configService.get('DIAGNOSTIC_METRICS_PATH'))
        .pipe(csv())
        .on('data', (data: CsvRow) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            const item = this.diagnosticMetricsRepository.create({
              name: row[Object.keys(row)[0]],
              oru_sonic_codes: row.oru_sonic_codes,
              diagnostic: row.diagnostic,
              diagnostic_groups: row.diagnostic_groups,
              oru_sonic_units: row.oru_sonic_units,
              units: row.units,
              min_age: row.min_age,
              max_age: row.max_age,
              gender: row.gender,
              standard_lower: row.standard_lower,
              standard_higher: row.standard_higher,
              everlab_lower: row.everlab_lower,
              everlab_higher: row.everlab_higher,
            });
            newResult.push(item);
          }
          await this.diagnosticMetricsRepository.save(newResult);
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
