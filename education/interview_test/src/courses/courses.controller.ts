
// courses/courses.controller.ts
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
    Put,
    Delete,
    Query,
    Inject,
    Injectable,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CoursesService } from './courses.service';
  import { CreateCourseDto } from './dto/create-course.dto';
  import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/users/schemas/user.schema';
import { IUserStudentService } from 'src/users/students/user-student';
import { PaginationQueryDto } from 'src/utils/TypeGlobal';
  
  @Controller('courses')
  @Roles(Role.TEACHER,Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  export class CoursesController {
      constructor(@Inject("ICoursesSerivce") private readonly service: CoursesService,) {}
  
    
    @Post("create")
    create(@Body() dto: CreateCourseDto, @Request() req) {
      return this.service.create(dto, req.user.userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCourseDto, @Request() req) {
      return this.service.update(id, dto, req.user.userId);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.service.delete(id, req.user.userId);
    }
  
    @Post()
    findAll(@Body() data: PaginationQueryDto) {
      return this.service.findAll(data);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  }
  