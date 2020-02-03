import jwt from 'jsonwebtoken';

export default (req:any, res:any, next:any) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: 'Token is not valid.'
                }).end();
            }
            req.user = decoded;
            return next();
        });
    } else {
        return res.status(401).json({
            success: false,
            error: 'Token is not valid.'
        }).end();
    }
};