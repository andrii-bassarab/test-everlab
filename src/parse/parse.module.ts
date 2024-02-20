import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';

@Module({
  imports: [],
  controllers: [ParseController],
  providers: [ParseService],
  exports: [ParseService],
})
export class ParseModule {}
