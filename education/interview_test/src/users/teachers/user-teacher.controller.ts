import { Controller, Post, UseGuards,Request,Body, Put, Delete, Get, Param, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/role.decorator";
import { Role } from "../schemas/user.schema";
import { CreateTeachertDto } from "../dto/user-teacher.dto";
import { IUserTeacherService } from "./user-teacher";
import { PaginationQueryDto } from "src/utils/TypeGlobal";


@Controller("teachers")
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
export class UserTeacherController {
    constructor(
        @Inject("IUserTeacherService") private readonly userTeacherService: IUserTeacherService,
        
    ){

    }

    @Post("create")
    create(@Request() req,@Body() data : CreateTeachertDto){
        data.createBy = req.user.userId;
       return this.userTeacherService.create(data)
    }

    @Put("update/:id")
    update( 
        @Param('id') id: string,
        @Body() data : CreateTeachertDto
    ){
        return this.userTeacherService.update(id, data)
    }

    @Delete("delete/:id")
    delete( 
        @Param('id') id: string,
    ){
        return this.userTeacherService.delete(id)
    }

    @Get(":id")
    getOne(@Param('id') id: string){
        return this.userTeacherService.getOne(id)
    }

    @Post("")
    getAll(@Body() data: PaginationQueryDto){
        let option ={
            $or: [
                { isDeleted: { $exists: false } }, // field does not exist
                { isDeleted: false }               // field exists but value is false
              ],
            role : "teacher"
        }
        return this.userTeacherService.getAll(data,option)
    }
}
