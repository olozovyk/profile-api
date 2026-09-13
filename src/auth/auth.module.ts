import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailVerificationService } from './email-verification.service';
import { PasswordService } from './password.service';

@Module({
  imports: [UserModule, AppConfigModule, MailModule],
  providers: [AuthService, EmailVerificationService, PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}
