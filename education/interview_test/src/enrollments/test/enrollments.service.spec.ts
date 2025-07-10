import { Test, TestingModule } from "@nestjs/testing";
import { EnrollmentsService } from "../enrollments.service";
import { getModelToken } from "@nestjs/mongoose";
import { Enrollment } from "../schemas/enrollment.schema";

describe('EnrollmentsService', () => {
    let service: EnrollmentsService;
    const mockModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      deleteOne: jest.fn(),
      find: jest.fn(),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          EnrollmentsService,
          { provide: getModelToken(Enrollment.name), useValue: mockModel },
        ],
      }).compile();
  
      service = module.get<EnrollmentsService>(EnrollmentsService);
    });
  
    it('should enroll if not already enrolled', async () => {
      mockModel.findOne.mockResolvedValue(null);
      mockModel.create.mockResolvedValue({ userId: 'u1', courseId: 1 });
      const result = await service.enroll('u1', 1);
      expect(result.userId).toBe('u1');
    });
  
    it('should return true if already enrolled', async () => {
      mockModel.findOne.mockResolvedValue({ userId: 'u1', courseId: 1 });
      const result = await service.isEnrolled('u1', 1);
      expect(result).toBe(true);
    });
  });