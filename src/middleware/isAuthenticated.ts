import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IUserAuthRequest } from '../../global';
import { IUser } from '../../user';

export default (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: `Token is not valid: ${err}`
                }).end();
            }
            req.currentUser = decoded.data as IUser;
            return next();
        });
    } else {
        return res.status(401).json({
            success: false,
            error: 'No token was provided'
        }).end();
    }
};