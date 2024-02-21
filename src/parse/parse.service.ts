import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticMetricsEntity } from 'src/diagnostic-metrics/diagnostic_metrics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParseService {
  constructor(
    @InjectRepository(DiagnosticMetricsEntity)
    private diagnosticMetricsRepository: Repository<DiagnosticMetricsEntity>,
  ) {}

  parseOruFile(fileData: any) {
    const segments = fileData.split('\r');

    const tests = {};

    segments.forEach((row) => {
      const fields = row.split('|');
      if (fields[0] === 'OBX') {
        const test_name = fields[3].split('^')[1];
        const cleaned_test_name = test_name.replace(/:$/, '');
        const test_value = parseFloat(fields[5]);
        tests[cleaned_test_name] = test_value;
      }
    });

    return tests;
  }

  async getAbnormalValues(fileData: any) {
    const abnormalValues: Record<string, unknown> = {};
    const data = await this.diagnosticMetricsRepository.find();

    if (!data) {
      throw new HttpException(
        'Diagnostic Metrics is empty',
        HttpStatus.NOT_FOUND,
      );
    }

    const tests = this.parseOruFile(fileData);

    for (const [testName, testValue] of Object.entries(tests)) {
      const metric = data.find((metric) =>
        metric.oru_sonic_codes.includes(testName),
      );

      if (metric) {
        const lowerLimit = parseFloat(metric.everlab_lower as string);
        const upperLimit = parseFloat(metric.everlab_higher as string);

        if (
          typeof testValue === 'number' &&
          (testValue > lowerLimit || testValue < upperLimit)
        ) {
          abnormalValues[testName] = testValue;
        }
      }
    }

    return { abnormalValues };
  }
}
