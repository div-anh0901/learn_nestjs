import { User } from './user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
}
