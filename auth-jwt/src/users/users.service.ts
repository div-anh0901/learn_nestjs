import {Injectable} from '@nestjs/common';

export type User = any;
@Injectable()
export class UsersService{
    private readonly users=[
        {
            id: 1,
            username: 'hello',
            password: '1234'
        },
        {
            id:2,
            username:'okela',
            password:'1234'
        }
    ];

    async findOne(username:string):Promise<User|undefined>{
        return this.users.find(user=> user.username ===username)
    }

}
