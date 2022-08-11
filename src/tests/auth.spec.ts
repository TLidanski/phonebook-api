import { app } from '../app-init';
import request from 'supertest';
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const api = request(app.getApp());
const mockUser = {
    email: 'mock@user.bg',
    name: 'Tihomir Lidanski',
    password: 'pwd'
};

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Register Test Suite', () => {

    it('Should return 201 on successful register', async () => {
        const response = await api.post('/register').send(mockUser);

        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe(mockUser.email);
    });

    it('Should get 400 and an error msg if user exists', async () => {
        const userRepository = AppDataSource.getRepository(User);
        const userDTO = {
            email: 'duplicate@user.bg',
            name: 'Tihomir Lidanski',
            password: 'pwd'
        };
        const user = userRepository.create(userDTO);
        await userRepository.save(user);
        const response = await api.post('/register').send(userDTO);

        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toEqual('User already exists');
    });
});

describe('Login Test Suite', () => {
    it('Should log a user and return a token', async () => {
        const {email, password} = mockUser;
        const response = await api.post('/login').send({email, password});

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});