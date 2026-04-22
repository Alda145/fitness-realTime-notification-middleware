import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailService } from './send-email.service';

@Controller('sendEmail')
export class SendEmailController {
    constructor(private readonly sendEmail: SendEmailService) { }


    @Post('post')
    public async send(@Body() message: any) {
        return await this.sendEmail.sendEmail(message);
    }
}
