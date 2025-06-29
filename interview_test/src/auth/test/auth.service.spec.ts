import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/user.service';
import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;

    const mockUser = {
        _id: 'abc123',
        username: 'user1',
        email: 'a@mail.com',
        password: 'hashed',
        toObject: () => ({ _id: 'abc123', username: 'user1', email: 'a@mail.com' }),
      };
      const usersService = {
        findByEmail: jest.fn().mockResolvedValue(mockUser),
      };

      const jwtService = {
        sign: jest.fn().mockReturnValue('token123'),
      };
    
    beforeEach(async()=>{
        const module : TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {provide: UsersService, useValue: usersService},
                {provide: JwtService, useValue: jwtService }
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });
    it("should validate user and return payload", async()=>{
       (bcrypt.compare as jest.Mock).mockResolvedValue(true)
        const result = await service.validateUser('a@mail.com', '123');
        expect(result.email).toBe('a@mail.com');
    });


    it('should return token on login', async () => {
        const token = await service.login(mockUser);
        expect(token.access_token).toBe('token123');
      });



})  