import { NextFunction, Request, Response } from 'express';
import { logWithLabel } from '../../src/utils/console';
const logMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const header = req.headers;
   const userAuth = header['user-agent'];
   const user = req.params.user;
   logWithLabel("routes", `User: ${user} | User-Agent: ${userAuth}`)
   next();
};

export { logMiddleware };
