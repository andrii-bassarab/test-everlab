import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticMetricsEntity } from 'src/diagnostic-metrics/diagnostic_metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticMetricsEntity])],
  controllers: [ParseController],
  providers: [ParseService],
  exports: [ParseService],
})
export class ParseModule {}
