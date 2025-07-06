import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity({name:"array_student"})
export class Array_student {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, user => user.array_student, { eager: true })
    @JoinColumn()
    course: Course;

    @Column()
    studentID: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    updatedDate: Date;
}