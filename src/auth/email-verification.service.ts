import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class EmailVerificationService {
  public getToken(): string {
    return randomUUID();
  }

  public getTokenExpiresDate(): Date {
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
}
