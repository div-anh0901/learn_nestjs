// users/dto/create-user.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    password: string;
  
    role ?: string; 
  }