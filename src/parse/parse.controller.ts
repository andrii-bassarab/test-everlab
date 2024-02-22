import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseService } from './parse.service';
import { AbnormalValues } from './parse.service';

@Controller('parse')
export class ParseController {
  constructor(private readonly parseService: ParseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async getAbnormalValues(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ abnormalValues: AbnormalValues }> {
    const oruData = file.buffer.toString('utf-8');
    return this.parseService.getAbnormalValues(oruData);
  }
}
