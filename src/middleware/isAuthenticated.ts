import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { IUserAuthRequest } from '../../global';

export default (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors, decoded: object | string) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: `Token is not valid: ${err}`
                }).end();
            }
            // @ts-ignore
            req.currentUser = decoded.data;
            return next();
        });
    } else {
        return res.status(401).json({
            success: false,
            error: 'No token was provided'
        }).end();
    }
};