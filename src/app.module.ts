import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/base.config.service';
import { DiagnosticsModule } from './diagnostics/diagnostics.module';
import { DiagnosticsGroupsModule } from './diagnostic-groups/diagnostic-groups.module';
import { ConditionsModule } from './conditions/conditions.module';
import { DiagnosticMetricsModule } from './diagnostic-metrics/diagnostic_metrics.module';
import { ParseModule } from './parse/parse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    DiagnosticsModule,
    DiagnosticsGroupsModule,
    ConditionsModule,
    DiagnosticMetricsModule,
    ParseModule,
  ],
})
export class AppModule {}
