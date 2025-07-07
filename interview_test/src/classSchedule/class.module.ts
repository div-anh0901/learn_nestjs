import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchedule } from 'src/shared/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassSchedule])],
  controllers: [ClassController],
  providers: [
      {
        provide: "IClassSerivce",
        useClass: ClassService
      }
    ],
  exports: [
    {
      provide: "IClassSerivce",
      useClass: ClassService
    }
  ]

})
export class ClassModule {}
