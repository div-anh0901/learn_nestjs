
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
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CoursesService } from './courses.service';
  import { CreateCourseDto } from './dto/create-course.dto';
  import { UpdateCourseDto } from './dto/update-course.dto';
  
  @Controller('courses')
  export class CoursesController {
    constructor(private readonly service: CoursesService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCourseDto, @Request() req) {
      return this.service.create(dto, req.user.userId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateCourseDto, @Request() req) {
      return this.service.update(id, dto, req.user.userId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Request() req) {
      return this.service.delete(id, req.user.userId);
    }
  
    @Get()
    findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
      return this.service.findAll(Number(page), Number(limit));
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.service.findOne(id);
    }
  }
  