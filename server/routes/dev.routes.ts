import { logMiddleware } from '../middleware/logs.middlware';
import { Router, Request, Response } from 'express';
import model from '../../src/models/model';
const router = Router();

router.get('/api/:user', logMiddleware, async (req: Request, res: Response) => {
   const data = await model.findOne({ user_id: req.params.user });
   if (!data)
      return res.status(404).json({ message: 'User not found in database' });
   return res.status(200).json(data);
});

export { router };
