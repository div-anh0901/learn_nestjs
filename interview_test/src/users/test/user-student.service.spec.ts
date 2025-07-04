import { Test, TestingModule } from "@nestjs/testing";
import { UserStudentService } from "../students/user-student.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { ConflictException, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

describe('UserStudentService', () => {
    let service: UserStudentService;
    let userModel: any;

    const mockUser = {
        _id: 'user123',
        email: 'test@mail.com',
        password: 'hashed',
        role: 'student',
        save: jest.fn(),
      };


      const mockUserModel = {
        findOne: jest.fn(),
        exists: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
        countDocuments: jest.fn(),
        find: jest.fn(),
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UserStudentService,
            {
              provide: getModelToken(User.name),
              useValue: mockUserModel,
            },
          ],
        }).compile();
    
        service = module.get<UserStudentService>(UserStudentService);
        userModel = module.get(getModelToken(User.name));
      });

      afterEach(() => jest.clearAllMocks());

      describe('createStudent', () => {

        it('should throw ConflictException if user already exists', async () => {
            userModel.exists.mockResolvedValue(true);
      
            await expect(
              service.createStudent({ email: 'test@mail.com' } as any),
            ).rejects.toThrow(ConflictException);
          });


          it('should create and return a new user', async () => {
            userModel.exists.mockResolvedValue(null);
            const hashed = await bcrypt.hash('12345678', 10);
      
            userModel.save = jest.fn().mockResolvedValue({ ...mockUser, password: hashed });
      
            const userInstance = {
              save: jest.fn().mockResolvedValue(mockUser),
            };
      
            userModel.mockImplementationOnce(() => userInstance);
      
            const result = await service.createStudent({ email: 'test@mail.com' } as any);
      
            expect(result).toEqual(mockUser);
            expect(userInstance.save).toHaveBeenCalled();
          });
      })

      describe('getOneStudent', () => {
        it('should return student if found', async () => {
          userModel.findById.mockResolvedValue(mockUser);
          const result = await service.getOneStudent('user123');
          expect(result).toEqual(mockUser);
        });
    
        it('should throw NotFoundException if student not found', async () => {
          userModel.findById.mockResolvedValue(null);
          await expect(service.getOneStudent('invalid')).rejects.toThrow(NotFoundException);
        });
      });

    
  describe('changePassword', () => {
    it('should throw NotFoundException if student not found', async () => {
      userModel.findById.mockResolvedValue(null);
      await expect(service.changePassword('123', 'newpass')).rejects.toThrow(NotFoundException);
    });

    it('should update password and return success', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const result = await service.changePassword('user123', 'newpass');

      expect(result).toEqual({
        success: true,
        message: 'Password updated',
      });
    });

    it('should return failed message if no change occurred', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.updateOne.mockResolvedValue({ modifiedCount: 0 });

      const result = await service.changePassword('user123', 'newpass');

      expect(result).toEqual({
        success: false,
        message: 'No changes made',
      });
    });
  });

  describe('updateUser', () => {
    it('should throw NotFoundException if student not found', async () => {
      userModel.findById.mockResolvedValue(null);
  
      await expect(
        service.updateUser('123', { fullName: 'Updated' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  
    it('should return success = true if user is updated', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.updateOne.mockResolvedValue({ modifiedCount: 1 });
  
      const result = await service.updateUser('123', { fullName: 'Updated' } as any);
  
      expect(result).toEqual({
        success: true,
        message: 'Update succeeded',
      });
    });
  
    it('should return success = false if no document was updated', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.updateOne.mockResolvedValue({ modifiedCount: 0 });
  
      const result = await service.updateUser('123', { fullName: 'NoChange' } as any);
  
      expect(result).toEqual({
        success: false,
        message: 'No update occurred',
      });
    });
  });

  
  describe('deleteStudent', () => {
    it('should throw NotFoundException if student not found', async () => {
      userModel.findById.mockResolvedValue(null);
  
      await expect(service.deleteStudent('invalid-id')).rejects.toThrow(NotFoundException);
    });
  
    it('should return success = true if student deleted', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
      const result = await service.deleteStudent('123');
  
      expect(result).toEqual({
        success: true,
        message: 'Student deleted successfully',
      });
    });
  
    it('should return success = false if deleteOne deleted nothing', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      userModel.deleteOne.mockResolvedValue({ deletedCount: 0 });
  
      const result = await service.deleteStudent('123');
  
      expect(result).toEqual({
        success: false,
        message: 'Delete failed',
      });
    });
  });
})