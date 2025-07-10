import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { GrpcController } from 'src/grpc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
