import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IClassSerivce } from './class';
import { CreateClassDto, ResponseClassDataType, UpdateClassDto } from './dto/class.dto';
import { PaginationQueryDto } from 'src/utils/TypeGlobal';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassSchedule } from 'src/shared/entities/class.entity';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { HttpExceptionFilter } from 'src/Interceptor/http-exception.filter';

@Injectable()
export class ClassService implements IClassSerivce  {

    constructor(
         @InjectRepository(ClassSchedule)
            private classRepo: Repository<ClassSchedule>,
    ){

    }

    async create(data: CreateClassDto): Promise<ResponseClassDataType> {
        const conflicts = await this.classRepo.find({
            where: [
              {
                date: data.date,
                room: data.room,
                startTime: LessThanOrEqual(data.endTime),
                endTime: MoreThanOrEqual(data.startTime),
              }
            ]
          });

        if(conflicts.length >0){
            throw new ConflictException("Class be booked by others");
        }
        const insertData=  await this.classRepo.create(data)
        const rs = await this.classRepo.save(insertData);
        return rs
    }

    async update(id: string, data: UpdateClassDto): Promise<ResponseClassDataType> {
        const conflicts = await this.classRepo.find({
            where: [
              {
                id: Not(id),
                date: data.date,
                room: data.room,
                startTime: LessThanOrEqual(data.endTime),
                endTime: MoreThanOrEqual(data.startTime),
              }
            ]
          });
          if(conflicts.length >0){
            throw new ConflictException("Class be booked by others");
        }
        const classSchedule = await this.classRepo.findOneBy({id: id});
        const rs = await this.classRepo.save({...classSchedule, ...data});
        return rs;
    }

    async getOne(id: string): Promise<ResponseClassDataType> {
        const classSchedule = await this.classRepo.findOneBy({id: id});
        if(!classSchedule){
            throw new NotFoundException("Recorse not exists or be deleted");
        }
        return classSchedule;
    }

    async getMulti(pagi?: PaginationQueryDto) {
        var option = {}
        if(pagi != null){
            const { limit = pagi.limit, page = pagi.page } = pagi;
            const skip = (page - 1) * limit;
          
            const [rs, total] = await this.classRepo.findAndCount({
                skip: skip,
                take: limit,
                order: { id: 'DESC' },
              });
            
            return {
              data: rs,
              meta: {
                limit: pagi.limit,
                page: pagi.page,
                total: total,
              }
            }
          }else {
            return await this.classRepo.find(option);
          }
    }

    async  delete(id: string): Promise<any> {
        const classSchedule = await this.classRepo.findOneBy({id: id});
        if(!classSchedule){
            throw new NotFoundException("Recorse not exists or be deleted");
        }
        try {
            await this.classRepo.delete(id);
        } catch (error) {
            return false
        }
        return  true
    }


}
