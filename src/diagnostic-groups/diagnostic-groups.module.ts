import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticsGroupsEntity } from './diagnostic-groups.entity';
import { DiagnosticsGroupsController } from './diagnostic-groups.controller';
import { DiagnosticsGroupsService } from './diagnostic-groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticsGroupsEntity])],
  controllers: [DiagnosticsGroupsController],
  providers: [DiagnosticsGroupsService],
  exports: [DiagnosticsGroupsService],
})
export class DiagnosticsGroupsModule {}
