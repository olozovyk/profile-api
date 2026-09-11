import {
  SESv2Client,
  SendEmailCommand,
  SendEmailRequest,
} from '@aws-sdk/client-sesv2';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';

export interface ISendMailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

@Injectable()
export class MailService {
  private readonly client: SESv2Client;

  constructor(private readonly config: AppConfigService) {
    this.client = new SESv2Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.key,
        secretAccessKey: config.aws.secret,
      },
    });
  }

  public async send({
    from,
    to,
    subject,
    html,
    text,
  }: ISendMailParams): Promise<string | undefined> {
    const input: SendEmailRequest = {
      FromEmailAddress: from,
      Destination: {
        ToAddresses: [to],
      },
      Content: {
        Simple: {
          Subject: {
            Data: subject,
            Charset: 'utf-8',
          },
          Body: {
            Text: {
              Data: text,
              Charset: 'utf-8',
            },
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
        },
      },
    };

    const command = new SendEmailCommand(input);
    const { MessageId } = await this.client.send(command);

    return MessageId;
  }
}
