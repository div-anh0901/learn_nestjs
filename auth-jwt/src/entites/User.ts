import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({name: "users"})
export class User {

    @PrimaryColumn()
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column({default: null})
    phone: string | null;
  
    @Column({default: null})
    avatar: string | null;

    @Column({default: null})
    status: string | null; 

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({default: null})
    address: string | null;
  
    @Column({default: null})
    createdAt: Date ;

    // use verify second times
    @Column({ nullable: true })
    twoFactorSecret: string;
  
    // use verify second times
    @Column({ default: false })
    isTwoFactorEnabled: boolean;
}