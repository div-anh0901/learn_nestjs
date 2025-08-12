import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { UserRepositoryImpl } from './infra/user.repository.impl';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
     // First register the class
     UserRepositoryImpl,
     // Then map the interface token to it
     {
       provide: 'UserRepository',
       useExisting: UserRepositoryImpl,
     },
    CreateUserUseCase,
    GetUserUseCase,
   
  ],
})
export class UserModule {}
