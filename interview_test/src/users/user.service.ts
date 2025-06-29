
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    var rs = await this.userModel.findOne({ email })
    return rs;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateData: any): Promise<User> {
    var rs = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    if(rs == null) {
        throw new NotFoundException();
    }
    return rs
  }
}