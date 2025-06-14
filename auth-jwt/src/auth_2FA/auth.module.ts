import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { MailService } from 'src/mail.service';

@Module({
  imports:[UsersModule,PassportModule],
  providers: [LocalStrategy, JwtStrategy, AuthService,MailService],
  controllers: [AuthController]
})
export class AuthModule_2FA {}
