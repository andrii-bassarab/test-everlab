import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { existsSync } from 'fs';
import { ConfigService } from '@nestjs/config';

config();

export class BaseConfigService {
  private readonly baseDir: string;

  constructor(
    private readonly env: { [k: string]: string | undefined },
    private configService: ConfigService,
  ) {
    let current = __dirname;
    while (!existsSync(join(current, 'node_modules'))) {
      current = join(current, '../');
    }
    this.baseDir = current;
  }

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.configService.get(key);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value || '';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DATABASE_URL'),
      port: Number(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USERNAME'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      retryAttempts: 10,
      retryDelay: 3000,
      logging: ['error'],
      synchronize: true,
    };
  }
}

const configService = new BaseConfigService(process.env, new ConfigService());

export { configService };
