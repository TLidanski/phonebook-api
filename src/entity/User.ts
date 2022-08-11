import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Contact } from './Contact';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Contact, contact => contact.user)
    contact: Contact;
}