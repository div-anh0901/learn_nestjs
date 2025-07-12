import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    password: string;
  }