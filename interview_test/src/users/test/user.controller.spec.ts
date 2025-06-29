import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../user.controller"
import { UsersService } from "../user.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";

describe("UsersController",()=>{

    let controller : UsersController;
    let userService: Partial<UsersService>;

    beforeEach(async()=>{
        userService = {
            create: jest.fn().mockResolvedValue({ email: 'user1@gmail.com', username: "user1", password: "123456" }),
            findById: jest.fn().mockResolvedValue({ _id: '123' }),
            update: jest.fn().mockResolvedValue({ email: 'user1@gmail.com' }),
            findByEmail: jest.fn().mockResolvedValue({ email: 'user1@gmail.com' }),
        };
        const module: TestingModule= await Test.createTestingModule({
            providers:[
                UsersService,
                {
                    provide:getModelToken(User.name),
                    useValue: userService
                }
            ]

        }).compile();

        controller = module.get<UsersController>(UsersController);
    });


})