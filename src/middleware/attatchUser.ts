import UserModel from '../models/user';
import { Response, NextFunction } from 'express';
import { IUserAuthRequest } from '../../global';

export default async (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.currentUser._id as string;
        const user = await UserModel.findById(userId).select('-password -salt');
        if (!user) {
            res.status(401).end();
        }
        req.currentUser = user;
        return next();
    } catch(error) {
        return res.json(error).status(500);
    }
}