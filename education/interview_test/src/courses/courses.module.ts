import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "../shared/entities/course.entity";
import { Array_student } from "src/shared/entities/array_student.entity";
import { UsersModule } from "src/users/user.module";



@Module({
 imports: [
    TypeOrmModule.forFeature([Course]),
    UsersModule
  ],
  providers: [ {
    useClass: CoursesService,
    provide: "ICoursesSerivce"
  }],
  controllers: [CoursesController],
})
export class CoursesModule {}
