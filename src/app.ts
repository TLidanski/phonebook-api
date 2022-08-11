import express, { Application } from 'express';
import * as server from 'http';
import Controller from './interfaces/controller.interface';
import { AppDataSource } from './data-source';

export default class App {
    private app: Application;
    private port: number;
    private server: server.Server;

    constructor(constructorObj: {port: number, controllers: Controller[], middlewares: any}) {
        const {middlewares, controllers, port} = constructorObj;
        this.app = express();
        this.port = port;
        this.server = server.createServer(this.app);

        this.setUpMiddlewares(middlewares);
        this.setUpRoutes(controllers);
        this.setUpDatabaseConnection();
    }

    private setUpRoutes = (controllers: Controller[]): void => {
        
        for (const controller of controllers) {
            this.app.use('/', controller.router);            
        }
    }

    private setUpMiddlewares = (middlewares: any): void => {

        for (const middleware of middlewares) {
            this.app.use(middleware);
        }
    }

    private setUpDatabaseConnection = async () => {
        await AppDataSource.initialize();
    }

    public listen = (): void => {
        this.server.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }

    public getApp = (): Application => {
        return this.app;
    }
}