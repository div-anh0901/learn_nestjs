import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/User';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { hashPassword, comparedPassword } from 'src/config/convertPassword';
import { LoginUser, RegisterUser } from 'src/types/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){

    }


    async createRecord(record : RegisterUser){
        var hasPass = await  hashPassword(record.password)

         var data = {
            id: faker.string.uuid(),
            email: record.email,
            name: record.name,
            password: hasPass,
         }

         var create = await this.usersRepository.create(data)
         await this.usersRepository.save(create);
         return {
            message: "User retrieved successfully!", 
            result: create,
         }
    }
    
    async findUserById(id: string){
        var user = await this.usersRepository.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user
    }

    async findUserByEmail(email: string){
        var user = await this.usersRepository.findOneBy({email})
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user
    }

    async validateUser(user : LoginUser){
        var ischeck = await this.usersRepository.findOneBy({email: user.email})
        if(!ischeck){
            throw new NotFoundException('User not found');
        }
        var ischeckPassword = await comparedPassword(user.password,ischeck.password);
        if(!ischeckPassword){
            throw new NotImplementedException('Password not match');
        }
        ischeck.role ="admin"
        
        return ischeck
    }

     async updateUserByEmail(email: string, dataUpdate) {
        var user = await this.usersRepository.findOneBy({email})
        if(!user){
            throw new NotFoundException('User not found');
        }

        try {
            await this.usersRepository.update(email, dataUpdate)
        } catch (error) {
            console.log(error)
            return "false"
        }
    }

    async updateUserById(id: string, dataUpdate) {
        var user = await this.usersRepository.findOneBy({id})
        if(!user){
            throw new NotFoundException('User not found');
        }

        try {
            await this.usersRepository.update(id, dataUpdate)
        } catch (error) {
            console.log(error)
            return "false"
        }
    }
}
