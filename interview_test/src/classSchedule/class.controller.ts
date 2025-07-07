import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IClassSerivce } from './class';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { PaginationQueryDto } from 'src/utils/TypeGlobal';

@Controller('classes')
@Roles(Role.TEACHER,Role.ADMIN)
@UseGuards(JwtAuthGuard)
export class ClassController {
    constructor(
        @Inject("IClassSerivce") private readonly classService : IClassSerivce
    ){}

    
    @Post("create")
    create(@Body() data: CreateClassDto){
        return this.classService.create(data);
    }

    @Put("update/:id")
    update(@Param("id") id : string, @Body() data: UpdateClassDto){
        return this.classService.update(id, data)
    }

    @Get("/:id")
    getOne(@Param("id") id : string){
        return this.classService.getOne(id);
    }

    @Post()
    getAll(@Body() data: PaginationQueryDto){
        return this.classService.getMulti(data)
    }


    @Delete("/:id")
    removeRecord(@Param("id") id : string){
        return this.classService.delete(id)
    }

}
