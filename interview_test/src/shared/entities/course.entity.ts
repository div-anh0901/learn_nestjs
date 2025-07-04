// courses/entities/course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Array_student } from './array_student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  teacher_owner: string; // giao vien chu nhiem

  @Column()
  time: string; // thời gian kéo dài

  @Column('text')
  description: string;

  @Column()
  createdBy: string; // userId từ MongoDB

  @OneToMany(() => Array_student, post => post.idcourse)
  array_student : Array_student[]

}