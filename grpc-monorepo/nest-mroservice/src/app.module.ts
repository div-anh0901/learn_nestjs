import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { GrpcController } from './grpc.controller';
import { Student } from './students/student.entity';
import { Course } from './courses/course.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'fake_data',
    entities: [Student, Course],
    synchronize: true,
  }), StudentsModule, CoursesModule,],
  controllers: [GrpcController],
  providers: [],
})
export class AppModule {}
