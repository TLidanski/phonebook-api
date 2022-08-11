import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mobilePhone: string;

    @Column()
    homePhone: string;

    @Column()
    workPhone: string;

    @Column({ nullable: true })
    userId: number;

    @OneToOne(() => User, user => user.contact)
    @JoinColumn()
    user: User
}