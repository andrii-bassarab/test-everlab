import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticsGroupsEntity } from './diagnostic-groups.entity';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

interface CsvRow {
  [key: string]: string;
  diagnostics: string;
  diagnostic_metrics: string;
}

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

  parse(): Promise<void> {
    const results: CsvRow[] = [];

    const newResult: DiagnosticsGroupsEntity[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(this.configService.get('DIAGNOSTIC_GROUPS_PATH'))
        .pipe(csv())
        .on('data', (data: CsvRow) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            const item = this.diagnosticsGroupsRepository.create({
              name: row[Object.keys(row)[0]],
              diagnostics: row.diagnostics,
              diagnostic_metrics: row.diagnostic_metrics,
            });
            newResult.push(item);
          }
          await this.diagnosticsGroupsRepository.save(newResult);
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
