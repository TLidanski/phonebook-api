import App from './app';

import 'dotenv/config';
import express from 'express';
import { AuthController } from './controllers/auth.controller';

export const app: App = new App({
    port: Number(process.env.PORT),
    controllers: [
        new AuthController()
    ],
    middlewares: [
        express.json()
    ]
});