import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { IUserTeacherService } from "./user-teacher";
import { CreateTeachertDto } from "../dto/user-teacher.dto";
import { PaginationQueryDto, ResponseBoolean } from "src/utils/TypeGlobal";
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { IUserStudentService } from "../students/user-student";

@Injectable()
export class UserTeacherSerice implements IUserTeacherService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
       @Inject("IUserStudentService") private readonly userStudentService: IUserStudentService
    ){}


    async generateUser(): Promise<CreateTeachertDto>{
        const hashedPassword = await bcrypt.hash("12345678", 10); //password default = 12345678
        return {
            username: faker.person.fullName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            avatar: "",
            age: "35",
            codeId: faker.phone.number()+"",
            password: hashedPassword,
            role: "teacher",
            createBy: "68677637256167916d23a4bb"
        };
    }
        
    async generateUsers() {
        const users: CreateTeachertDto[] = [];
        for (let i = 0; i < 100; i++) {
            users.push(await this.generateUser());
        }
        return this.userModel.create(users);
    }
    

   async  create( param: CreateTeachertDto): Promise<CreateTeachertDto> {
        param.role = "teacher";
       return this.userStudentService.create(param)
    }

    update(id: string, data: CreateTeachertDto): Promise<ResponseBoolean> {
        return this.userStudentService.update(id, data)
    }


    delete(id: string): Promise<Boolean> {
        return this.userStudentService.delete(id)
    }

    getAll(data?: PaginationQueryDto,option?: any) {
        //this.generateUsers();
        return this.userStudentService.getAll(data , option)
    }

    async getOne(id: string) {
        const teacher = await this.userModel.findById(id);
        if (!teacher) throw new NotFoundException('User not found or be deleted');
        return teacher
    }

}