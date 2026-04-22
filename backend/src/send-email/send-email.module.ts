import { Module } from '@nestjs/common';
import { SendEmailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
      }
    }),
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService]
})
export class SendEmailModule { }
