import { Controller, Get } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsEntity } from './conditions.entity';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get()
  async getAll(): Promise<ConditionsEntity[]> {
    return this.conditionsService.getAll();
  }

  @Get('parse')
  async parse() {
    return this.conditionsService.parse();
  }
}
