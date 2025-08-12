import { PaginationQueryDto } from "src/utils/TypeGlobal";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";


export interface ICoursesSerivce{
     create(dto: CreateCourseDto, userId: string);
     update(id:string, dto: UpdateCourseDto, userId: string)
     delete(id: string, userId: string);
     findAll(query: PaginationQueryDto) 
     findOne(id: string)
}