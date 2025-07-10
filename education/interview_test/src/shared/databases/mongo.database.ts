// src/shared/databases/mongo.database.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/elearning'),
  ],
})
export class MongoDatabaseModule {}