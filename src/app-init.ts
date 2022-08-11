import App from './app';

import 'dotenv/config';
import express from 'express';
import { AuthController } from './controllers/auth.controller';
import { ContactController } from './controllers/contact.controller';

export const app: App = new App({
    port: Number(process.env.PORT),
    controllers: [
        new AuthController(),
        new ContactController()
    ],
    middlewares: [
        express.json()
    ]
});