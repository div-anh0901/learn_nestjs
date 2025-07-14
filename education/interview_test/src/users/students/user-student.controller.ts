import { Body, Controller, Delete, Get, Inject, Param, Post,Put,Query,Request, UseGuards } from "@nestjs/common";
import { IUserStudentService } from "./user-student";
import { CreateStudentDto } from "../dto/create-student.dto";
import { Roles } from "src/auth/role.decorator";
import { Role } from "../schemas/user.schema";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChangePasswordStudent } from "../dto/change-password-student.dto";
import { UpdateCourseDto } from "src/courses/dto/update-course.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { PaginationQueryDto } from "src/utils/TypeGlobal";
import { AddStudentToCourse, AddStudentToCourseMulti } from "../dto/student-and-course.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller("students")
@UseGuards(JwtAuthGuard)
@Roles(Role.TEACHER,Role.ADMIN)
export class UserStudentController {
    constructor(
        @Inject("IUserStudentService") private readonly userService: IUserStudentService
    ) { }

    @Post("")
    async createUser(@Request() req,@Body() student : CreateStudentDto){
        student.createBy = req.user.userId;
        student.role = "student";
        const data = await this.userService.createStudent(student);
        return {
            message: "Add student success",
            data: data
        }
    }

    @Post("changePassword")
    async changePassword(@Request() req, @Body() data: ChangePasswordStudent ){
        await this.userService.changePassword(data.id, data.password);
        return {

            message: "Changes Password Successs",
            data: true
        }
    }

    @Put("updateOne/:id")
    async updateUser(
        @Request() req,
        @Param('id') idstudent: string,
        @Body() student : UpdateStudentDto)
    {
        try {
            await this.userService.updateUser(idstudent, student)
            return  true
        } catch (error) {
            return false
        }
    }


    @Post("getAlls")
    async getAlls(@Body() data: PaginationQueryDto){
        try {
           const rs = await this.userService.getAllStudent(data)
            return  rs
        } catch (error) {
            return false
        }
    }

    @Get("getOne/:id")
    async getOne(@Param("id") id: string){
        try {
           const rs = await this.userService.getOneStudent(id)
            return  rs
        } catch (error) {
            return false
        }
    }


    @Delete("delete/:id")
    async Delete(@Param("id") id: string){
        try {
           const rs = await this.userService.deleteStudent(id)
            return  rs
        } catch (error) {
            return false
        }
    }

    @Post("exportExcel")
    async exportExcel(){
       return this.userService.exportExcel()
    }

    @Post("addStudentToCourse")
    async addStudentToCourse(@Body() data: AddStudentToCourse){
        try {
           const rs = await this.userService.addStudentInCourse(data)
            return  rs
        } catch (error) {
            return {
                success: false,
                data: null
            }
            
        }
    }

    
    @ApiOperation({ summary: 'Add multiple students to a course' })
    @Post("addStudentToCourses")
    @ApiBody({ type: AddStudentToCourseMulti })
    @ApiResponse({
        status: 201,
        description: 'Students added to course successfully',
        schema: {
        example: {
            meta: {
            totalSuccess: 3,
            totalFailed: 1,
            },
            addedStudents: [
            { studentID: 's1', courseId: 'course-123' },
            { studentID: 's2', courseId: 'course-123' },
            ],
        },
        },
    })
    async addStudentToCourses(@Body() data: AddStudentToCourseMulti){
        try {
            const rs = await this.userService.addStudentInCourseMutil(data)
            return rs
        } catch (error) {
            return {
                success: false,
                data: null
            }
            
        }
    }
}