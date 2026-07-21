import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvVars } from './validation';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<EnvVars, true>) {}

  get app() {
    return {
      port: this.configService.get('PORT', { infer: true }),
    };
  }

  get db() {
    return {
      user: this.configService.get('DB_USER', { infer: true }),
      password: this.configService.get('DB_PASSWORD', { infer: true }),
      name: this.configService.get('DB_NAME', { infer: true }),
    };
  }
}
