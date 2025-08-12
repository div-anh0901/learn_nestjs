import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BullModule } from '@nestjs/bull';
import { UserExportProcessor } from './user.export.processor';
//npm install @nestjs/bull bull ioredis exceljs
//npm install @nestjs/axios --save
@Module({
  imports:[BullModule.registerQueue({name: 'export'})],
  controllers: [UserController],
  providers: [UserService, UserExportProcessor]
})
export class UserModule {}
