import { Controller, Get } from '@nestjs/common';
import { DiagnosticMetricsService } from './diagnostic_metrics.service';
import { DiagnosticMetricsEntity } from './diagnostic_metrics.entity';

@Controller('diagnostic-metrics')
export class DiagnosticMetricsController {
  constructor(
    private readonly diagnosticMetricsService: DiagnosticMetricsService,
  ) {}

  @Get()
  async getAll(): Promise<DiagnosticMetricsEntity[]> {
    return this.diagnosticMetricsService.getAll();
  }

  @Get('parse')
  async parse() {
    return this.diagnosticMetricsService.parse();
  }
}
