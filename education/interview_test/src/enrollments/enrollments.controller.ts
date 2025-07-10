import {
    Controller,
    Post,
    Delete,
    Get,
    Request,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { EnrollmentsService } from './enrollments.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('enrollments')
  @UseGuards(JwtAuthGuard)
  export class EnrollmentsController {
    constructor(private readonly service: EnrollmentsService) {}
  
    @Post(':courseId')
    enroll(@Param('courseId') courseId: number, @Request() req) {
      return this.service.enroll(req.user.userId, courseId);
    }
  
    @Delete(':courseId')
    unenroll(@Param('courseId') courseId: number, @Request() req) {
      return this.service.unenroll(req.user.userId, courseId);
    }
  
    @Get('my-courses')
    getMyCourses(@Request() req) {
      return this.service.getUserCourses(req.user.userId);
    }
  }