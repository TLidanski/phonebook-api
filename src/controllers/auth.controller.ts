import express, { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { AppDataSource } from '../data-source';
import { JWTService } from '../services/jwt.service';
import { CryptoService } from '../services/crypto.service';
import { User } from '../entity/User';

export class AuthController implements Controller {
    path: string = '/';
    router: Router = express.Router();
    private jwtService: JWTService = new JWTService();
    private cryptoService: CryptoService = new CryptoService();
    private userRepository = AppDataSource.getRepository(User);

    constructor() {
        this.initRoutes();
    }

    public initRoutes = (): void => {
        this.router.post(`${this.path}register`, this.register);
    }

    private register = async (req: Request, res: Response): Promise<Response | void> => {
        const {email, password} = req.body;
        const existingUser = await this.userRepository.findOne({
            where: {email: email}
        });
        if (existingUser) {
            return res.status(400).json({msg: 'User already exists'});
        }
        try {
            const user = this.userRepository.create({...req.body, password: await this.cryptoService.hashPassword(password)});
            const result = await this.userRepository.save(user);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({msg: error});
        }
    }
}