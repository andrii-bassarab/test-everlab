import { Controller, Get } from '@nestjs/common';
import { DiagnosticsEntity } from './diagnostics.entity';
import { DiagnosticsService } from './diagnostics.service';

@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Get()
  async getAll(): Promise<DiagnosticsEntity[]> {
    return this.diagnosticsService.getAll();
  }

  @Get('parse')
  async parse() {
    return this.diagnosticsService.parse();
  }
}
