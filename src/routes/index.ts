import express from 'express';
const router = express.Router();
import { Request, Response } from 'express';

router.get('/', (req: Request, res: Response) => {
    res.send('Index Route');
});

module.exports = router;