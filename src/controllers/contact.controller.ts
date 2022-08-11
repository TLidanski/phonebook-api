import express, { Request, Response, Router } from 'express';
import { AppDataSource } from '../data-source';
import Controller from '../interfaces/controller.interface';
import { JWTService } from '../services/jwt.service';
import { Contact } from '../entity/Contact';

export class ContactController implements Controller {
    path: string = '/contacts';
    router: Router = express.Router();
    private contactRepository = AppDataSource.getRepository(Contact);
    private jwtService: JWTService = new JWTService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = (): void => {
        this.router.post(`${this.path}`, this.jwtService.validateToken, this.create);
    }

    private create = async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const contact = this.contactRepository.create(req.body);
            const result = await this.contactRepository.save(contact);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}