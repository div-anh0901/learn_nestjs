import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from 'src/entites/ActivityLog';
import { User } from 'src/entites/User';
import { LoginUser, RegisterUser } from 'src/types/user';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
         private  userSerive: UsersService,
         private jwtService: JwtService,
         @InjectRepository(ActivityLog) private activityLogRepo: Repository<ActivityLog>,
    ){}


    async register(data: RegisterUser){
       return this.userSerive.createRecord(data);
    }


    async login(user: User, ip: string, userAgent: string ) {
       // console.log(user)
        const payload = { sub: user.id, role: user.role };

         // 3. Save activity
       /* await this.activityLogRepo.save({ 
            userId: user.id, 
            ipAddress: ip, 
            userAgent 
        });*/

        return { access_token: this.jwtService.sign(payload) };
      }

}
