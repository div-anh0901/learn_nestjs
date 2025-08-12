// courses/entities/course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, VersionColumn } from 'typeorm';
import { Array_student } from './array_student.entity';
import { ClassSchedule } from './class.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  teacher: string; // giao vien chu nhiem

  @Column()
  time: number; // thời gian kéo dài  lưa bằng phú

  @Column('text')
  description: string;

  @VersionColumn()
  version: string;

  @Column()
  subject: string;

  @Column()
  createdBy: string; // userId từ MongoDB

  @OneToMany(() => Array_student, post => post.course)
  array_student : Array_student[];

  @OneToMany(() => ClassSchedule, schedule => schedule.course, { cascade: true })
  schedules: ClassSchedule[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;
   
  @CreateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @Column({default: true})
  isActive: boolean;
}