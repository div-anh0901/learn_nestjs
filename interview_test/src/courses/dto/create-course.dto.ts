import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @ApiProperty({ type: String })
    title: string;

    @ApiProperty({ type: String })
    time: string;

    @ApiProperty({ type: String })
    description: string;

    @ApiProperty({ type: String })
    createdBy: string;// id nguoi tao

    @ApiProperty({ type: String })
    @IsNotEmpty()
    teacher: string; // id co giao chu nhiem
  }


  export class CourseType {
    name: string;
    title: string;
    time: string;
    description: string;
    createdBy: string;
    teacher: string;
  }