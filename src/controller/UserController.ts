import {Request,Response} from 'express';
import { AppDataSource } from '../data-source';
import User from '../entity/User';

class UserController{
   async store(req: Request, res: Response){
        const repository = AppDataSource.getRepository(User);
        const {email, password} = req.body;
        const UserExists = await repository.findOne({where:{email}});

        if(UserExists){
            return res.sendStatus(409);
        }

        const user = repository.create({email, password});
        await repository.save(user);

        return res.json(user);
    }
}

export default new UserController();