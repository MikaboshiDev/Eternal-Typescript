import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../src/utils/jwt_token';
import { RequestExt } from '../interface/req.interface';
import { logWithLabel } from '../../src/utils/console';

/**
 * The function `checkJwt` is a middleware function that checks if a user is authorized by verifying a
 * JWT token.
 * @param {RequestExt} req - The `req` parameter is an object representing the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties for manipulating the response, such as
 * setting the status code, sending data, and setting headers.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
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
    logWithLabel("error", `The error api session ${e}`)
  }
};

/**
 * The function checks if the user is "Horus" and redirects if not.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting headers, status code, and sending data back to the client.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns the string 'RUT_REDIRECT_INVALID' if the value of the `user` parameter is not equal to
 * 'Horus'.
 */
const checkSegurity = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers;
  const userAuth = header['user-agent'];
  const user = req.params.user;
  if (user !== 'Horus') return 'RUT_REDIRECT_INVALID';
  next();
};

export { checkJwt, checkSegurity };
