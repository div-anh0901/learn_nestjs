import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterData } from './dtos/RegisterData.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Roles } from './role.decorator';
import { Role } from 'src/types/user';
import { RolesGuard } from './guards/Role.guards';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService,private readonly userService: UsersService){}

    @Post("register")
    register(@Body() data: RegisterData){
        return this.authService.register(data)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];
        //  return this.authService.login(req.user , ip, userAgent);
        return this.authService.login(req.user , "", "");
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/getUser')
    async getUser(@Request() req) {
        return this.userService.findUserById(req.user.id)
    }

    @Roles(Role.USER)
    @UseGuards(AuthGuard('local'), RolesGuard)
    @Get('user')
    findAllUsers(){
        // only admins can view
    }
}
