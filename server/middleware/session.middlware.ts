import { NextFunction, Request, Response } from 'express';
import { logWithLabel } from '../../src/utils/console';
import { verifyToken } from '../utils/jwt_token';
import { RequestExt } from '../../global';

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop();
    if (!jwt) return res.status(401).send({ message: 'Unauthorized Access' });

    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(401).send({ message: 'Unauthorized Access' });
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    res.status(401).send({ message: 'Unauthorized Access' });
    logWithLabel('error', `The error api session ${e}`);
  }
};

const checkSegurity = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers;
  const userAuth = header['user-agent'];
  const user = req.params.user;
  if (user !== 'Horus') return 'RUT_REDIRECT_INVALID';
  next();
};

export { checkJwt, checkSegurity };
