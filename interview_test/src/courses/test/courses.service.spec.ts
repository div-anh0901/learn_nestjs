import { CoursesService } from "../courses.service";
import { Repository } from 'typeorm';
import { Course } from "../../shared/entities/course.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('CoursesService', () => {
    let service: CoursesService;
    let repo: jest.Mocked<Repository<Course>>;

    beforeEach(async () => {
        const mockRepo = {
          save: jest.fn(),
          findOneBy: jest.fn(),
          delete: jest.fn(),
          find: jest.fn(),
        };
    
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CoursesService,
            {
              provide: getRepositoryToken(Course),
              useValue: mockRepo,
            },
          ],
        }).compile();
    
        service = module.get<CoursesService>(CoursesService);
        repo = module.get(getRepositoryToken(Course));
      });
  

      it('should create a course', async () => {
        const dto = { title: 'Math', description: 'Basic Math', id: 1 };
        const saved = { ...dto, createdBy: 'user123' };
        repo.save.mockResolvedValue(saved);
    
        const result = await service.create(dto, 'user123');
        expect(result).toEqual(saved);
        expect(repo.save).toHaveBeenCalledWith({ ...dto, createdBy: 'user123' });
      });

})