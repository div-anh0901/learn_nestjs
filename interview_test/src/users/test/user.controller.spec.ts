import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../user.controller"
import { UsersService } from "../user.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ExecutionContext } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("UsersController",()=>{

    let controller : UsersController;
    let userService: Partial<UsersService>;
    const mockUsersService = {
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
      };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [{ provide: UsersService, useValue: mockUsersService }],
        })
        .overrideGuard(JwtAuthGuard)
        .useValue({
            canActivate: (context: ExecutionContext) => {
            const request = context.switchToHttp().getRequest();
            request.user = { userId: '123' }; // mock user
            return true;
            },
        })
        .compile();
        controller = module.get<UsersController>(UsersController);
        userService = module.get<UsersService>(UsersService);
    });

    it('should register a user', async () => {
        const dto: CreateUserDto = { username: 'john', email: 'john@mail.com', password: '123' };
        const createdUser = { id: '1', ...dto };
    
        mockUsersService.create.mockResolvedValue(createdUser);
    
        const result = await controller.register(dto);
        expect(result).toEqual(createdUser);
        expect(userService.create).toHaveBeenCalledWith(dto);
      });


      it('should return current user profile', async () => {
        const userId = '123';
        const user = { id: userId, username: 'john' };
    
        mockUsersService.findById.mockResolvedValue(user);
    
        const result = await controller.getProfile({ user: { userId } });
        expect(result).toEqual(user);
        expect(userService.findById).toHaveBeenCalledWith(userId);
      });

      it('should update user profile', async () => {
        const userId = '123';
        const dto: UpdateUserDto = { displayName: 'newName', email: 'new@mail.com' };
        const updatedUser = { id: userId, ...dto };
    
        mockUsersService.update.mockResolvedValue(updatedUser);
    
        const result = await controller.updateProfile({ user: { userId } }, dto);
        expect(result).toEqual(updatedUser);
        expect(userService.update).toHaveBeenCalledWith(userId, dto);
      });
    
})