import { Injectable } from '@nestjs/common';
import { DiagnosticMetricsEntity } from './diagnostic_metrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

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

  parse() {
    const results = [];

    const newResult = [];

    fs.createReadStream(this.configService.get('DIAGNOSTIC_METRICS_PATH'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const el of results) {
          const item = this.diagnosticMetricsRepository.create({
            name: el[Object.keys(el)[0]],
            oru_sonic_codes: el.oru_sonic_codes,
            diagnostic: el.diagnostic,
            diagnostic_groups: el.diagnostic_groups,
            oru_sonic_units: el.oru_sonic_units,
            units: el.units,
            min_age: el.min_age,
            max_age: el.max_age,
            gender: el.gender,
            standard_lower: el.standard_lower,
            standard_higher: el.standard_higher,
            everlab_lower: el.everlab_lower,
            everlab_higher: el.everlab_higher,
          });
          newResult.push(item);
        }
        return this.diagnosticMetricsRepository.save(newResult);
      });
  }
}
