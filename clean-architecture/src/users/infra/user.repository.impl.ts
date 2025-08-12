import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
