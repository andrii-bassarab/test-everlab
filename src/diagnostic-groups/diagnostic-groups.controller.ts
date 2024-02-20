import { Controller, Get } from '@nestjs/common';
import { DiagnosticsGroupsService } from './diagnostic-groups.service';
import { DiagnosticsGroupsEntity } from './diagnostic-groups.entity';

@Controller('diagnostics-groups')
export class DiagnosticsGroupsController {
  constructor(
    private readonly diagnosticsGroupsService: DiagnosticsGroupsService,
  ) {}

  @Get()
  async getAll(): Promise<DiagnosticsGroupsEntity[]> {
    return this.diagnosticsGroupsService.getAll();
  }

  @Get('parse')
  async parse() {
    return this.diagnosticsGroupsService.parse();
  }
}
