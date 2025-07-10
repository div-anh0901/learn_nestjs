import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity({name: "classes"})
export class ClassSchedule{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Course, course => course.schedules, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseId' })
    course: Course;
  
    @Column()
    className: string;
  
    @Column({ type: 'date' })
    date: string;
  
    @Column()
    startTime: string; // HH:mm
  
    @Column()
    endTime: string;
  
    @Column()
    room: string;
  
    @Column({ default: false })
    isCanceled: boolean;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedDate: Date;

}