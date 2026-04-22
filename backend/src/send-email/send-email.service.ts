import { HttpException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) { }

    public async sendEmail(data: any) {
        try {
            await this.mailerService.sendMail({
                from: data.email,  // Email i personit që e dërgon form-in
                to: process.env.EMAIL_USER,  // Email yt
                subject: data.subject,
                text: `${data.name} (${data.phone}): ${data.message}`, // fallback plain text
                html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Message:</strong><br/>${data.message}</p>
            </div>
        `
            });
        } catch (err) {
            console.error("Error sending email:", err);
            throw new HttpException("email could not be send", 500);
        }
    }
}
