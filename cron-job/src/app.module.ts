import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

/*@Module({
  imports: [ScheduleModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})*/
@Module({
  imports: [UserModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
