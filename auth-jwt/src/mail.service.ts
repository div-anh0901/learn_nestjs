import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({ 
    host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "", // create email in "App passwords on the Manage Acount Google",
        pass: "",// take pass in "App passwords on the Manage Acount Google",
      },
  });

  async send2FACode(email: string, code: string) {

    try {
      await this.transporter.sendMail({ 
        from: "anh.dev.2002@gmail.com",
        to: email,
        subject:'Your 2FA Code',
        text:`Your 2FA code is: ${code}`
      });
    } catch (error) {
      console.log(1)
      console.log(error)
    }
  }
}