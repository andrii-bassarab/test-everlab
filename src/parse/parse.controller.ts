import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseService } from './parse.service';

@Controller('parse')
export class ParseController {
  constructor(private readonly parseService: ParseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  getAbnormalValues(@UploadedFile() file: any) {
    const oruData = file.buffer.toString('utf-8');
    return this.parseService.getAbnormalValues(oruData);
  }
}
