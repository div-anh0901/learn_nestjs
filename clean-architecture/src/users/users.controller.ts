import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { User } from './domain/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: Partial<User>) {
    return this.createUser.execute(body);
  }

  @Get()
  async findAll() {
    return this.getUser.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.getUser.findById(id);
  }
}
