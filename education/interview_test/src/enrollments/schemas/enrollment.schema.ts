import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: number;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
