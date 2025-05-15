import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Our App!',
      template: './welcome', // corresponds to templates/welcome.hbs
      context: {
        name,
      },
    });
  }

  async sendNewPassword(to: string, password: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Khôi phục mật khẩu',
      template: './new-password', // corresponds to templates/new-password.hbs
      context: {
        newPassword: password,
      },
    });
  }
}
