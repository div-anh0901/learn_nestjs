import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddStudentToCourse{
    @IsNotEmpty()
    idstudent: string;
    @IsNotEmpty()
    idcourse: string;
}

export class AddStudentToCourseMulti{
    @ApiProperty({ type: [String], description: 'Array of student IDs to add' })
    idstudent: string[];
    @IsNotEmpty()
    @ApiProperty({ description: 'Course ID to add students to type number' })
    idcourse: string;
}



export interface ImportExcelStudent{
    username: string;
    email: string;
    age: string;
    address: string;
    role?: string;
    codeId: string; // so cccd
    createBy: string;
    password ?:string;
    phone ?: string;
    gender ?: string;
    birthday ?: string; 
}


