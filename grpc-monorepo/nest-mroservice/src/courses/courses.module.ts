import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { GrpcController } from 'src/grpc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}