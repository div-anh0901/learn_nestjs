// courses/courses.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>
  ) {}

  create(dto: CreateCourseDto, userId: string) {
    return this.courseRepo.save({ ...dto, createdBy: userId });
  }

  async update(id: number, dto: UpdateCourseDto, userId: string) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException();
    if (course.createdBy !== userId) throw new ForbiddenException();
    return this.courseRepo.save({ ...course, ...dto });
  }

  async delete(id: number, userId: string) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course || course.createdBy !== userId) throw new ForbiddenException();
    return this.courseRepo.delete(id);
  }

  findAll(page: number, limit: number) {
    return this.courseRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.courseRepo.findOneBy({ id });
  }
}