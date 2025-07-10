
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([Course, Array_student]),
  ],
  controllers: [UsersController, UserStudentController],
  providers: [
    UsersService, 
      {
    provide: "IUserStudentService",
    useClass: UserStudentService
  }
],
  exports: [UsersService, {
    provide: "IUserStudentService",
    useClass: UserStudentService
  }],
})
export class UsersModule {}