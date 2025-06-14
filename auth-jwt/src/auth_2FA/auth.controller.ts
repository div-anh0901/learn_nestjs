import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth_2fa')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}


    @UseGuards(AuthGuard("local")) // User must be authenticated first
    @Post('2fa/generate')
    async generate(@Req() req, @Body() body: { email: string }) {
        //case 1 send QR
            // const { QR } = await this.authService.generateTwoFactorSecret(req.user.id);
            // return { QR }; // Send back QR to scan
        //case 1 send Email
        return this.authService.generateTwoFactorSecretByEmail(req.user.id, body.email);
    }
    
    @UseGuards(AuthGuard("local")) // User must be authenticated first
    @Post('2fa/verify')
    async verify(@Req() req, @Body() body: { code: string }) {
      const isValid = await this.authService.verifyTwoFactorCode(req.user.id, body.code);
      if (isValid) {
        await this.authService.enableTwoFactor(req.user.id);
        return { message:'2FA is now ON'};
      }
      throw new UnauthorizedException('Invalid code');
    }
}
