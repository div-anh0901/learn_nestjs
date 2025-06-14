import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as speakeasy from 'speakeasy'
import * as QRCode from 'qrcode'
import { MailService } from 'src/mail.service';

@Injectable()
export class AuthService {
    constructor(
         private  userSerive: UsersService,
         private mailService: MailService
    ){}


    //generate code by QR
    async generateTwoFactorSecret(userId: string) {
        const secret = speakeasy.generateSecret({ length: 20 }); // thoi gian thay doi code
        var objUpdate = {
            twoFactorSecret: secret.base32
        }
    
        // Store in database
        await this.userSerive.updateUserById(userId, objUpdate);
        // Provide QR code to scan in Google Authenticator
        const otpauth = secret.otpauth_url;
        const QR = await QRCode.toDataURL(otpauth);
        return { QR, secret: secret.base32 };
      }

      //Generate code by sending email
      
      async generateTwoFactorSecretByEmail(userId: string, email: string) {
        const secret = speakeasy.generateSecret({ length: 20 }); // thoi gian thay doi code
        var objUpdate = {
            twoFactorSecret: secret.base32
        }
    
        // Store in database
        await this.userSerive.updateUserById(userId, objUpdate);
        
         // generate TOTP from this secret
        const code = speakeasy.totp({ 
            secret: secret.base32, 
            encoding:'base32'
        });
        
        await this.mailService.send2FACode(email, code);
        // Provide QR code to scan in Google Authenticator
        return { message:'Code sent to email. Please check your inbox.' };
      }

      async verifyTwoFactorCode(userId: string, code: string) {
        const user = await this.userSerive.findUserById(userId);
        if (!user?.twoFactorSecret) {
          throw new BadRequestException('2FA is not configured');
        }
        return speakeasy.totp.verify({ 
          secret: user.twoFactorSecret, 
          encoding:'base32', 
          token: code 
        });
      }

      async enableTwoFactor(userId: string) {
        await this.userSerive.updateUserById(userId, { isTwoFactorEnabled: true });
      }

}
