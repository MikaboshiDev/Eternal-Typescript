import { authInspection } from '../middleware/auth.middleware';
import { Router, Response, Request } from 'express';
import { passport } from '../../src/utils/passport';
const router = Router();

router.get('/auth/login', passport.authenticate('discord', {
      failureRedirect: '/auth/logout',
   }),
   (req: Request, res: Response) => {
      res.redirect('/');
   }
);

router.get('/auth/logout', authInspection, (req: Request, res: Response) => {});

export { router };
