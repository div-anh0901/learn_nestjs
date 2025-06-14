// src/user/dto/create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}