import express from 'express';
const router = express.Router();
import AuthService from '../services/auth';

router.get('/signup', async (req, res) => {
    res.send('Sign up route');
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