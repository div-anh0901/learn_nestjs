import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StudentsService } from './students/students.service';
import { CoursesService } from './courses/courses.service';

@Controller()
export class GrpcController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService
  ) {}

  @GrpcMethod('SchoolService', 'CreateStudent')
  async createStudent(data: { name: string; age: number }) {
    return this.studentsService.create(data);
  }

  @GrpcMethod('SchoolService', 'GetStudent')
  async getStudent(data: { id: number }) {
    return this.studentsService.get(data.id);
  }

  @GrpcMethod('SchoolService', 'CreateCourse')
  async createCourse(data: { title: string }) {
    return this.coursesService.create(data);
  }

  @GrpcMethod('SchoolService', 'GetCourse')
  async getCourse(data: { id: number }) {
    return this.coursesService.get(data.id);
  }
}