
import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../user.service"
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";


describe("UserService",()=>{
    let service: UsersService;
    let mockUserModel: any;


    beforeEach(async()=>{
        mockUserModel = {
            create: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn()
        }

        const module: TestingModule= await Test.createTestingModule({
            providers:[
                UsersService,
                {
                    provide:getModelToken(User.name),
                    useValue:mockUserModel
                }
            ]

        }).compile();

        service = module.get<UsersService>(UsersService);
    });
    it('should register a user', async () => {
        const dto = { username: 'user1', email: 'test@example.com', password: '123456' };
        mockUserModel.create.mockResolvedValue(dto);
        const result = await service.create(dto);
        expect(result).toEqual(dto);
      });
    
      it('should find user by email', async () => {
        const user = { _id: '1', email: 'a@mail.com' };
        mockUserModel.findOne.mockResolvedValue(user);
        const result = await service.findByEmail('a@mail.com');
        expect(result).toEqual(user);
      });

})