// auth/jwt.strategy.ts (ví dụ chiến lược JWT)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // hoặc dùng biến môi trường
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}