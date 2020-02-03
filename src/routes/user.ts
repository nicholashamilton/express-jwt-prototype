import express from 'express';
const router = express.Router();
import AuthService from '../services/auth';
import isAuthenticated from '../middleware/isAuthenticated';
import attatchUser from '../middleware/attatchUser';

router.get('/current', isAuthenticated, attatchUser, async (req:any, res) => {
    const user = req.currentUser;
    return res.status(200).json({ user, success: true }).end();
});

router.post('/login', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
        const authServiceInstance = new AuthService();
        const { user, token, error } = await authServiceInstance.login(email, password);
        if (error) {
            return res.json({ error }).status(500).end();
        }
        return res.status(200).json({ user, token }).end();
    } catch (error) {
        return res.json(error).status(500).end();
    }
});

router.post('/signup', async (req, res) => {
    try {
        const reqUser = req.body.user;
        const authServiceInstance = new AuthService();
        const { user, token, error } = await authServiceInstance.signUp(reqUser);
        if (error) {
            return res.json({ error }).status(500).end();
        }
        return res.json({ user, token }).status(200).end();
    } catch (error) {
        return res.json(error).status(500).end();
    }
});

module.exports = router;