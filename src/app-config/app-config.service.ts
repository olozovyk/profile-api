import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvVars } from './validation';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<EnvVars, true>) {}

  get app() {
    return {
      port: this.configService.get('PORT', { infer: true }),
      tz: this.configService.get('TZ', { infer: true }),
    };
  }

  get db() {
    return {
      host: this.configService.get('DB_HOST', { infer: true }),
      port: this.configService.get('DB_PORT', { infer: true }),
      user: this.configService.get('DB_USER', { infer: true }),
      password: this.configService.get('DB_PASSWORD', { infer: true }),
      name: this.configService.get('DB_NAME', { infer: true }),
    };
  }

  get aws() {
    return {
      key: this.configService.get('AWS_ACCESS_KEY', { infer: true }),
      secret: this.configService.get('AWS_SECRET_KEY', { infer: true }),
      region: this.configService.get('AWS_REGION', { infer: true }),
    };
  }
}
