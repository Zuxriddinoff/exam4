import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private readonly mailServise: MailerService){}

  async sendOtp(email:string, otp: string):Promise<void>{
    // const {email, firstName, lastName} = user
      await this.mailServise.sendMail({
        to:email,
        subject:"assalomu aleykum uzum marketga hush kelibsiz ",
        text: otp
      })
    
  }
}
