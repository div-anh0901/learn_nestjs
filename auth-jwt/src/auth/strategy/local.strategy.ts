// src/auth/strategy/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UsersService) {
    // we tell passport we want to use "email" instead of "username"
    super({ usernameField: 'email' });
  }
  
  async validate(email: string, password: string) {
    const user = await this.userService.validateUser({email, password});
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return user;
  }
}