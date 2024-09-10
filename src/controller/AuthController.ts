import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
    async authenticate(req: Request, res: Response) {
        try {
            const repository = AppDataSource.getRepository(User);
            const { email, password } = req.body;
            const user = await repository.findOne({ where: { email } });

            if (!user) {
                return res.sendStatus(401); 
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.sendStatus(401); 
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

            delete user.password;

            res.json({
                user,
                token
            });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new UserController();
