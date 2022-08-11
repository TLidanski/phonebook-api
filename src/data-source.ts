import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Contact } from './entity/Contact';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Contact
    ],
    subscribers: [],
    migrations: [],
});