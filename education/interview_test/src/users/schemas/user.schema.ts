import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
    ADMIN = 'admin',
    STUDENT = 'student',
    TEACHER = 'teacher'
  }
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: true })
  password: string;

  @Prop({ select: true, default: "teacher" })
  role: Role;

  @Prop({ select: true })
  age: string;

  @Prop({ select: true })
  avatar: string;

  @Prop({ select: true })
  address: string;

  @Prop({ select: true })
  codeId: string; // so cccd

  @Prop({ select: true })
  createBy: string; 

  @Prop({ select: true })
  phone: string; 

  @Prop({ select: true, default: Date.now() })
  createdAt?: Date;

  @Prop({ select: true, default: Date.now() })
  updatedAt?: Date;

  @Prop({ select: true , default: true})
  isActived ?: boolean; 

  @Prop({ select: true , default: true})
  status ?: boolean; 

}

export const UserSchema = SchemaFactory.createForClass(User);