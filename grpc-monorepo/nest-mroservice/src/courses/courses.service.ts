import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

    async create(data: { title: string }) {
      return this.repo.save(data);
    }
  
    async get(id: number) {
      return this.repo.findOneBy({ id });
    }
}
