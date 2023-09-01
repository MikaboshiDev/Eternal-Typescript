import { Request, Response, NextFunction } from 'express';

async function authInspection(req: Request, res: Response, next: NextFunction) {
   if (!req.isAuthenticated()) return res.redirect('/auth/login');
   next();
}

export { authInspection };
