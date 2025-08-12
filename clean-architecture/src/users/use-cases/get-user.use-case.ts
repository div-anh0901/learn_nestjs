import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: IUserRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  findById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }
}
