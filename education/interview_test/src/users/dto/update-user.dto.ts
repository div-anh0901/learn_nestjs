import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

// users/dto/update-user.dto.ts
export class UpdateUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    email: string;
    age: string;
    avatar: string;
    address: string;
    codeId: string; // so cccd
    phone: string;
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    gender ?: string; 

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    birthday ?: string; 
}