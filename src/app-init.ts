import App from './app';

import 'dotenv/config';
import express from 'express';

export const app: App = new App({
    port: Number(process.env.PORT),
    controllers: [
    ],
    middlewares: [
        express.json()
    ]
});