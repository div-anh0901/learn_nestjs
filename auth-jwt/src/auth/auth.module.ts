import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: "1223232323",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
