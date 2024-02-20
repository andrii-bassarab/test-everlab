import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseService {
  parseOruFile(fileData: string) {
    const segments = fileData.split('\r').map((line) => line.split('|'));
    return segments;
  }
}
