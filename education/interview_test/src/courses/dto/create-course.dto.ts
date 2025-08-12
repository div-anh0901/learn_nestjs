import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: String })
    title: string;

    @ApiProperty({ type: Number })
    time: number;

    @ApiProperty({ type: String })
    description: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    teacher: string; // id co giao chu nhiem

    @ApiProperty({ type: String })
    @IsNotEmpty()
    subject: string;
  }


  export class CourseType {
    name: string;
    title: string;
    time: string;
    description: string;
    createdBy: string;
    teacher: string;
    subject: string;
  }