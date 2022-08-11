import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';

export class JWTService {
    private secret = process.env.JWT_SECRET || 'default secret token';

    public sign = (user: User) => {
        return jwt.sign({user}, this.secret);
    }

    public validateToken = (req: Request, res: Response, next: NextFunction) => {
        const bearerHeader: string | undefined = req.headers['authorization'];
        try {
            if(typeof bearerHeader !== 'undefined') {
                const token: string = bearerHeader.split(' ')[1];
                this.verify(token);
                next();
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            res.sendStatus(403);
        }
    }

    private verify = (token: string) => {
        jwt.verify(token, this.secret, err => {
            if (err) {
                throw new Error();
            }
        });
    }
}