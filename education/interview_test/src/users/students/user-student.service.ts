import { ConflictException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { IUserStudentService } from "./user-student";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { UpdateStudentDto } from "../dto/update-student.dto";
import { PaginationQueryDto, ResponseBoolean, TypePanigation } from "src/utils/TypeGlobal";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/shared/entities/course.entity";
import { Repository } from "typeorm";
import { Array_student } from "src/shared/entities/array_student.entity";
import { AddStudentToCourse, AddStudentToCourseMulti } from "../dto/student-and-course.dto";
import { faker } from '@faker-js/faker';
import { CreateCourseDto } from "src/courses/dto/create-course.dto";

@Injectable()
export class UserStudentService implements IUserStudentService  {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      @InjectRepository(Course) private courseRepo: Repository<Course>,
      @InjectRepository(Array_student) private arrayStudentRepo: Repository<Array_student>,


  
  ) {}
  async generateUser(): Promise<CreateStudentDto>{
    const hashedPassword = await bcrypt.hash("12345678", 10); //password default = 12345678

    return {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      avatar: "",
      age: "22",
      codeId: faker.phone.number()+"",
      password: hashedPassword,
      role: "student",
      createBy: "68677637256167916d23a4bb"
    };
  }

    async generateUsers() {
    const users: CreateStudentDto[] = [];
    for (let i = 0; i < 100; i++) {
      users.push(await this.generateUser());
    }
    
    return this.userModel.create(users);
  }
     async createStudent(student: CreateStudentDto): Promise<CreateStudentDto> {
        const hashedPassword = await bcrypt.hash("12345678", 10); //password default = 12345678

        const isExists = await this.userModel.findOne({email: student.email});
        if(isExists){
          throw new ConflictException("User exsisted")
        }

            const user = this.userModel.create({
              ...student,
              password: hashedPassword,
            });
            return user;
    }


    async changePassword(idstudent: string, password: string): Promise<boolean> {
      const student = await this.userModel.findById(idstudent);
       if (!student) throw new NotFoundException('User not found');
      try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await this.userModel.updateOne({_id: idstudent},{
            password: hashedPassword
          });
          return true;
      } catch (error) {
        return false;
      };
    }

    async updateUser(idstudent: string, data: UpdateStudentDto): Promise<ResponseBoolean> {
      const student = await this.userModel.findById(idstudent);
      if (!student) throw new NotFoundException('User not found');


      try {
        await this.userModel.updateOne({_id: idstudent}, data);
        return {
          success: true,
          message: "Update Sucessed!!"
        }; 
      } catch (error) {
        return {
          success: true,
          message: "Update Failed!!"
        }; 
      };
    }

    async getAllStudent(pagi: PaginationQueryDto) {
      var option = {  
        role: "student"
      }
      if(pagi != null){
          const { limit = pagi.limit, page = pagi.page , findText } = pagi;
          const skip = (page - 1)  * limit;
          if(findText != undefined && findText != ''){
            option["$or"] = [
                { username: { $regex: findText, $options: 'i' } },
                { email: { $regex: findText, $options: 'i' } },
            ]
          }
          const [res, total] = await Promise.all([
            this.userModel.find(option).skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(option).exec(),
          ]);
          
          return {
            data: res,
            meta: {
              limit: pagi.limit,
              page: pagi.page,
              total: total,
            }
          }
      }else {
          const { findText } = pagi;
          if(findText != undefined && findText != ''){
            option["$or"] = [
                { username: { $regex: findText, $options: 'i' } },
                { email: { $regex: findText, $options: 'i' } },
            ]
          }
          return await this.userModel.find(option).exec();
        }
    }



    async getOneStudent(idstudent: string) {
      const student = await this.userModel.findById(idstudent);
      if (!student) throw new NotFoundException('User not found or be deleted');
      return student
    }

    async deleteStudent(idstudent: string): Promise<Boolean> {
      const student = await this.userModel.findById(idstudent);
      if (!student) throw new NotFoundException('User not found or be deleted');
      try {
        await this.userModel.deleteOne({_id:idstudent});
        return true
      } catch (error) {
        throw new NotImplementedException("Process delete student being failed!!")
      }
    }

    async addStudentInCourse(param: AddStudentToCourse) {
      const course = await this.courseRepo.findOneBy({ id: param.idcourse });
     await this.generateUsers() 
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      var student = await this.arrayStudentRepo.findOneBy({studentID: param.idstudent});
      if(student){
        throw new ConflictException('Student existed');
      }

      const studentEntry = await this.arrayStudentRepo.create({
        studentID: param.idstudent,
        course: course,
      });
    
      try {
         await this.arrayStudentRepo.save(studentEntry);
      } catch (error) {
          console.log(error)
      }
      return studentEntry
    }

    async addStudentInCourseMutil(param: AddStudentToCourseMulti) {
      const course = await this.courseRepo.findOneBy({ id: param.idcourse });
      var originalCount = param.idstudent.length
      if (!course) {
        throw new NotFoundException('Course not found');
      }

      const existingStudents = await this.arrayStudentRepo.find({
        relations: ['course', 'course.array_student'],
        where:{course: {id: param.idcourse}}
      })
      const existingIds = new Set(existingStudents.map((s) => s.studentID));

       // Filter out students who are already in the course
      const newStudentIds = param.idstudent.filter((id) => !existingIds.has(id));

     var studentEntry =  await Promise.all(newStudentIds.map(id => 
        this.arrayStudentRepo.create({
          studentID: id,
          course: course,
        })
      ));

      try {
         await this.arrayStudentRepo.save(studentEntry);
      } catch (error) {
          console.log(error)
      }
      return {
        metal :{
          totalSuccess: newStudentIds.length,
          toalFailed: originalCount - newStudentIds.length
        } 
      }
    }

    async getStudentByIDMutil(param: string[]) {
      return await this.userModel.find({"_id" : {$in: param}}).select("-passowrd")
    }
}

