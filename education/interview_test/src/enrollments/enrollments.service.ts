import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from './schemas/enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>
  ) {}

  async enroll(userId: string, courseId: number) {
    const existing = await this.enrollmentModel.findOne({ userId, courseId });
    if (existing) throw new ForbiddenException('Đã đăng ký khóa học này.');
    return this.enrollmentModel.create({ userId, courseId });
  }

  async unenroll(userId: string, courseId: number) {
    return this.enrollmentModel.deleteOne({ userId, courseId });
  }

  async getUserCourses(userId: string) {
    return this.enrollmentModel.find({ userId });
  }

  async isEnrolled(userId: string, courseId: number): Promise<boolean> {
    const enrollment = await this.enrollmentModel.findOne({ userId, courseId });
    return !!enrollment;
  }
}