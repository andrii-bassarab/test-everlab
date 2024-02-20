import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticMetricsService } from './diagnostic_metrics.service';
import { DiagnosticMetricsController } from './diagnostic_metrics.controller';
import { DiagnosticMetricsEntity } from './diagnostic_metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticMetricsEntity])],
  controllers: [DiagnosticMetricsController],
  providers: [DiagnosticMetricsService],
  exports: [DiagnosticMetricsService],
})
export class DiagnosticMetricsModule {}
