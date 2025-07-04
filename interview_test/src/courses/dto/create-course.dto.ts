import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    title: string;

    time: string;

    description: string;

    createdBy: string;// id nguoi tao

    @IsNotEmpty()
    teacher_owner: string; // id co giao chu nhiem
  }