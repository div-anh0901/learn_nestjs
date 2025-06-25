
import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { UsersService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('register')
    async register(@Body() dto: CreateUserDto) {
      return this.usersService.create(dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req) {
      return this.usersService.findById(req.user.userId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
      return this.usersService.update(req.user.userId, body);
    }
  }
  