import { IsNotEmpty } from "class-validator";


export class UpdateStudentDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    email: string;
    age: string;
    avatar: string;
    address: string;
    role: string;
    codeId: string; // so cccd
    createBy: string;
}