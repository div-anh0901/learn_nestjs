// courses/courses.service.ts
import { Injectable, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../shared/entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/users/schemas/user.schema';
import { Array_student } from 'src/shared/entities/array_student.entity';
import { IUserStudentService } from 'src/users/students/user-student';
import { UsersService } from 'src/users/user.service';

@Injectable()

export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @Inject("IUserStudentService") private readonly userStudentService: IUserStudentService,
    @Inject() private readonly userService: UsersService,



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
   // const course = await this.courseRepo.findOne({ where: {id: id}, relations:["array_student"]});

    const course =  await this.courseRepo
    .createQueryBuilder('course')
    .leftJoinAndSelect('course.array_student', 'array_student')
    .where('course.id = :id', { id: id })
    .getOne();

    if(!course){
      throw new NotFoundException("Not found")
    }
    const studentID = new Set<string>(course?.array_student.map((s) => s.studentID));

    const[newStudents ,teacher]  = await Promise.all([
      this.userStudentService.getStudentByIDMutil([...studentID]),
      this.userService.findById(course.teacher)
    ]) 
    
    return {
        id: course.id,
        title: course.title,
        name: course.name,
        teacher: teacher,
        time:course.time,
        description: course.description,
        createdBy: course.id,
        array_student : newStudents
    }
  }
}