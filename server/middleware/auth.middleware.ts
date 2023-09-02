import { Request, Response, NextFunction } from 'express';
import { passport } from '../../src/utils/passport';

const authInspection = (req: Request, res: Response, next: NextFunction) => {
   if (!req.isAuthenticated()) return res.redirect('/auth/login');
   next();
};

export { authInspection };
