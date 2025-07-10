import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async create(data: { name: string; age: number }) {
    console.log(data)
    return this.repo.save(data);
  }

  async get(id: number) {
    return this.repo.findOneBy({ id });
  }
}
