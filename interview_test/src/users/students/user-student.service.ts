import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { IUserStudentService } from "./user-student";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserStudentService implements IUserStudentService  {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

     async createStudent(student: CreateStudentDto): Promise<CreateStudentDto> {
        const hashedPassword = await bcrypt.hash(student.password, 10); //password default = 12345678
            const user = this.userModel.create({
              ...student,
              password: hashedPassword,
            });
            return user;
    }
}