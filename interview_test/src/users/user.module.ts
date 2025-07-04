
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserStudentController } from './students/user-student.controller';
import { UserStudentService } from './students/user-student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController, UserStudentController],
  providers: [
    UsersService, 
      {
    provide: "IUserStudentService",
    useClass: UserStudentService
  }
],
  exports: [UsersService, {
    provide: "IUserStudentService",
    useClass: UserStudentService
  }],
})
export class UsersModule {}