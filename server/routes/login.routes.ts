import { authInspection } from '../middleware/auth.middleware';
import { Router, Response, Request } from 'express';
import { passport } from '../../src/utils/passport';
import { logMiddleware } from '../middleware/logs.middlware';
import model from '../../src/models/model';
const router = Router();

router.get('/auth/login', logMiddleware, passport.authenticate('discord', {
      failureRedirect: '/auth/logout',
   }),
   (req: Request, res: Response) => {
      res.redirect('/');
   }
);

router.get('/auth/logout', authInspection, logMiddleware, (req: Request, res: Response) => {
      res.status(404).json({
         message: 'The login failed in the api rest manager',
         alerts: 'please for in login api rest',
         code: 404,
      });
   }
);

router.post('/auth/api/login', logMiddleware, async (req: Request, res: Response) => {
      const data = await model.findOne({ user_id: req.body.user_id });
      if (data) return res.status(200).json({ message: 'User exist in database', code: 200 });
      const user = new model({
         username: req.body.username,
         user_id: req.body.user_id,
      });

      await user.save();
      return res.status(200).json({ message: 'User created in database', code: 200 });
   }
);

export { router };
