
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserStudentController } from './students/user-student.controller';
import { UserStudentService } from './students/user-student.service';
import { CoursesModule } from 'src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { Array_student } from 'src/shared/entities/array_student.entity';
import { UserTeacherController } from './teachers/user-teacher.controller';
import { UserTeacherSerice } from './teachers/user-teacher.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([Course, Array_student]),
  ],
  controllers: [UsersController, 
      UserStudentController,
      UserTeacherController
    ],
  providers: [
    UsersService, 
    {
      provide: "IUserStudentService",
      useClass: UserStudentService
    },
    {
      provide: "IUserTeacherService",
      useClass: UserTeacherSerice
    },
],
  exports: [
    UsersService, 
    {
      provide: "IUserStudentService",
      useClass: UserStudentService
    },
    {
      provide: "IUserTeacherService",
      useClass: UserTeacherSerice
    },
],
})
export class UsersModule {}