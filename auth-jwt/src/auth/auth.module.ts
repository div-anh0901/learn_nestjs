import {Module} from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import {JwtModule} from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';

@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            global: true,
            secret:'12345678',
            signOptions:{   expiresIn:  '60s'}
        })
    ],
    providers:[
        AuthService,
        {
            provide:APP_GUARD,
            useClass:AuthGuard,
        }
    ],
    controllers:[AuthController],
    exports:[AuthService]
})

export class AuthModule{}