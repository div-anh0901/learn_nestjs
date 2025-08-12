import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: IUserRepository,
  ) {}

  execute(data: Partial<User>): Promise<User> {
    return this.userRepo.create(data);
  }
}
