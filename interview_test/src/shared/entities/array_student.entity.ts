import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity({name:"array_student"})
export class Array_student {
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    @ManyToOne(() => Course, user => user.array_student)
    idcourse: number;

    @Column()
    studentID: string;
}