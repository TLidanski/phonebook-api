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
        this.router.get(`${this.path}/:skip/:take`, this.jwtService.validateToken, this.getAll);
        this.router.delete(`${this.path}/:id`, this.jwtService.validateToken, this.delete);
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

    private getAll = async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const {skip, take} = req.params;
            const contacts = await this.contactRepository.find({
                relations: ['user'],
                skip: Number(skip),
                take: Number(take)
            });

            return res.status(200).json(contacts);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    private delete = async (req: Request, res: Response): Promise<Response | void> => {
        try {
            const result = await this.contactRepository.delete(req.params.id);
            return res.status(202).json(result);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}