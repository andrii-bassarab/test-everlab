import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticsGroupsEntity } from './diagnostic-groups.entity';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiagnosticsGroupsService {
  constructor(
    @InjectRepository(DiagnosticsGroupsEntity)
    private diagnosticsGroupsRepository: Repository<DiagnosticsGroupsEntity>,
    private configService: ConfigService,
  ) {}

  async getAll(): Promise<DiagnosticsGroupsEntity[]> {
    return this.diagnosticsGroupsRepository.find();
  }

  parse() {
    const results = [];

    const newResult = [];

    fs.createReadStream(this.configService.get('DIAGNOSTIC_GROUPS_PATH'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const el of results) {
          const item = this.diagnosticsGroupsRepository.create({
            name: el[Object.keys(el)[0]],
            diagnostics: el.diagnostics,
            diagnostic_metrics: el.diagnostic,
          });
          newResult.push(item);
        }
        return this.diagnosticsGroupsRepository.save(newResult);
      });
  }
}
