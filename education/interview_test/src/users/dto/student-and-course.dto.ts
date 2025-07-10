import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddStudentToCourse{
    @IsNotEmpty()
    idstudent: string;
    @IsNotEmpty()
    idcourse: number;
}

export class AddStudentToCourseMulti{
    @ApiProperty({ type: [String], description: 'Array of student IDs to add' })
    idstudent: string[];
    @IsNotEmpty()
    @ApiProperty({ description: 'Course ID to add students to type number' })
    idcourse: number;
}



