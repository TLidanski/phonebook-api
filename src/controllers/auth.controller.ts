import express, { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';

export class AuthController implements Controller {
    path: string = '/';
    router: Router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = (): void => {
        this.router.post(`${this.path}register`, this.register);
    }

    private register = async (req: Request, res: Response): Promise<Response | void> => {}
}