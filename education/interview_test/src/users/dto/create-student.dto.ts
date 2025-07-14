import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    age: string;

    @ApiProperty({ type: [String] })
    avatar: string;

    @ApiProperty({ type: [String] })
    address: string;

    @ApiProperty({ type: [String] })
    role?: string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    codeId: string; // so cccd

    @ApiProperty({ type: [String] })
    createBy: string;

    @ApiProperty({ type: [String] })
    password ?:string;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    phone ?: string; 

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    gender ?: string; 

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    birthday ?: string; 
}