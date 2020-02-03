import UserModel from '../models/user';

export default async (req:any, res:any, next:any) => {
    try {
        const userId = req.user.data._id as string;
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