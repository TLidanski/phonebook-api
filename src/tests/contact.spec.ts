import { app } from '../app-init';
import request from 'supertest';
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const api = request(app.getApp());

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Contacts Suite', () => {
    it('Should create a contact with user relation', async () => {
        const userRepository = AppDataSource.getRepository(User);
        const userDTO = {
            email: 'contact@user.bg',
            name: 'Contact Test',
            password: 'test'
        };
        const contactDTO = {
            userId: 0,
            mobilePhone: '0898349556',
            homePhone: '333333',
            workPhone: '1111111'
        };
        const user = userRepository.create(userDTO);
        const userResponse = await userRepository.save(user);
        contactDTO.userId = userResponse.id;

        const result = await api.post('/contacts')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiVGlob21pciBMaWRhbnNraSIsImVtYWlsIjoidGxpZGFuc2tpQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJDJUODR4bjA2MFMuTmNMdk53L3lTMGVVZVc0dG1JRjFJOXBpU0NLLkhpWVAxMXRIM2lzYnVLIn0sImlhdCI6MTY2MDIyMzg1MH0.sEdTS-3zqg52PINFGTfpDhK_7dkUEjwdHWAc_z9Leo8')
        .send(contactDTO);

        expect(result.statusCode).toBe(201);
    })
});