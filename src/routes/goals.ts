import express from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import attatchUser from '../middleware/attatchUser';
import { IUser } from '../../user';
import { IUserAuthRequest } from '../../global';
import GoalsModel from '../models/goal';

router.post('/add', isAuthenticated, attatchUser, async (req: IUserAuthRequest, res: Response) => {
    const { title, completed } = req.body.goal;
    const user = req.currentUser as IUser;
    const goalDocument = await GoalsModel.create({
        title,
        completed,
        postedBy: user._id
    });
    goalDocument.save((err, goal) => {
        if (err) throw err;
        res.status(200).json({
            goal
        });
    });
});

router.get('/get', isAuthenticated, attatchUser, async (req: IUserAuthRequest, res: Response) => {
    const user = req.currentUser as IUser;
    GoalsModel.find({ postedBy: user._id }, (err, userGoals) => {
        if (err) res.json({ message: 'No Goals Found' });
        res.status(200).json({ userGoals });
    });
});

router.delete('/delete/:id', isAuthenticated, attatchUser, async (req: IUserAuthRequest, res: Response) => {
    const user = req.currentUser as IUser;
    if (user) {
        GoalsModel.findById({ _id: req.params.id }).remove().exec((err, message) => {
            if (err) throw err;
            res.json({ message });
        });
    }
});

module.exports = router;