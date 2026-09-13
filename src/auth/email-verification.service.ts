import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppConfigService } from 'src/app-config/app-config.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly config: AppConfigService,
    private readonly mail: MailService,
  ) {}

  public getToken(): string {
    return randomUUID();
  }

  public getTokenExpiresDate(): Date {
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  public async sendVerificationEmail({
    to,
    token,
    expiresDate,
  }: {
    to: string;
    token: string;
    expiresDate: Date;
  }): Promise<{ token: string; expiresDate: Date; messageId?: string }> {
    const subject = 'Email verification';
    const from = this.config.email.verificationFrom;

    const url = this.config.app.baseUrl;
    const text = `To verify email address please follow ${url}/auth/verify-email?token=${token}. The link will be active 24 hours.`;
    const html = `<h1>Email verification</h1>
      <p>To verify email address please follow 
        <a href="${url}/auth/verify-email?token=${token}">Link</a>.
      </p>
      <p>The link will be active 24 hours.</p>
      `;

    const messageId = await this.mail.send({ from, to, subject, text, html });

    return {
      token,
      expiresDate,
      messageId,
    };
  }
}
