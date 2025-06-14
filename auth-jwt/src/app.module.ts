import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { User } from './entites/User';
import { AuthModule_2FA } from './auth_2FA/auth.module';
import { ActivityLog } from './entites/ActivityLog';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule, AuthModule, AuthModule_2FA,
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,ActivityLog],
      synchronize: true, // WARNING: don't use this in production
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
