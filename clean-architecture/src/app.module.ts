import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/domain/user.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'fake_data',
    entities: [User],
    synchronize: true,
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
