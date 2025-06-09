import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {} // ✅ nomi to'g'ri

  async sendOtp(email: string, otp: string): Promise<void> {
    try {
      console.log(email, otp);
      
      await this.mailerService.sendMail({
        to: email,
        subject: "Assalomu alaykum, Uzum Marketga xush kelibsiz!",
        text: `Sizning OTP kodingiz: ${otp}`,
        html: `<b>Sizning OTP kodingiz:</b> ${otp}`,
      });

      console.log('✅ OTP yuborildi:', email);
    } catch (error) {
      console.log(error.stack);
      
      console.error('❌ OTP yuborishda xatolik:', error.message);
      throw error;
    }
  }
}
