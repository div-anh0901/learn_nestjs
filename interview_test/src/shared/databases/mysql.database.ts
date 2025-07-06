
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { Array_student } from '../entities/array_student.entity';
import { ClassSchedule } from '../entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '12345678',
        database: 'TestMicroservice',
        entities: [Course, Array_student, ClassSchedule],
        synchronize: true,
    }),
  ],
})
export class MysqlDatabaseModule {}