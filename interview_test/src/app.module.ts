import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { MongoDatabaseModule } from './shared/databases/mongo.database';
import { MysqlDatabaseModule } from './shared/databases/mysql.database';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [AuthModule, UsersModule ,CoursesModule, EnrollmentsModule, MongoDatabaseModule,MysqlDatabaseModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
