import { ConflictException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { IUserStudentService } from "./user-student";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { UpdateStudentDto } from "../dto/update-student.dto";
import { PaginationQueryDto, ResponseBoolean, TypePanigation } from "src/utils/TypeGlobal";

@Injectable()
export class UserStudentService implements IUserStudentService  {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
        role:"student"
      }
        if(pagi != null){
          const { limit = pagi.limit, page = pagi.page } = pagi;
          const skip = (page - 1) * limit;
        
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
}