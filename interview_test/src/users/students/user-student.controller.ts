import { Body, Controller, Inject, Post,Request } from "@nestjs/common";
import { IUserStudentService } from "./user-student";
import { CreateStudentDto } from "../dto/create-student.dto";
import { Roles } from "src/auth/role.decorator";
import { Role } from "../schemas/user.schema";


@Controller("students")
export class UserStudentController {
    constructor(
        @Inject("UserStudents") private readonly userService: IUserStudentService
    ) { }
    
    @Roles(Role.TEACHER)
    @Roles(Role.ADMIN)
    @Post("")
    createUser(@Request() req,@Body() student : CreateStudentDto){
        student.createBy = req.user.userId;
        student.role = "student"
        return this.userService.createStudent(student);
    }

    
}