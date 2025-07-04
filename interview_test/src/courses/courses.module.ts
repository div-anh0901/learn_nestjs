import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "../shared/entities/course.entity";



@Module({
 imports: [
    TypeOrmModule.forFeature([Course])
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
