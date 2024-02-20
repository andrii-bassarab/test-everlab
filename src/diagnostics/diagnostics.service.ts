import { Injectable } from '@nestjs/common';
import { DiagnosticsEntity } from './diagnostics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

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

  parse() {
    const results = [];

    const newResult = [];

    fs.createReadStream(this.configService.get('DIAGNOSTICS_PATH'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const el of results) {
          const item = this.diagnosticsRepository.create({
            name: el[Object.keys(el)[0]],
            diagnostic_groups: el.diagnostic_groups,
            diagnostic_metrics: el.diagnostic_metrics,
          });
          newResult.push(item);
        }
        return this.diagnosticsRepository.save(newResult);
      });
  }
}
