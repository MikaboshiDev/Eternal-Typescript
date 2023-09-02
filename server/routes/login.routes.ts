import { authLogout, postUser } from '../controllers/login.controllers';
import { authInspection } from '../middleware/auth.middleware';
import { logMiddleware } from '../middleware/logs.middlware';
import { Router, Response, Request } from 'express';
import { passport } from '../../src/utils/passport';
import { loginCtrl, registerCtrl } from '../controllers/auth.controllers';
const router = Router();

/**
 * @openapi
 * /auth/login:
 *  get:
 *   tags:
 *     - login
 *   summary: Log in the control website
 *   description: Log in the control website to be able to access different data and methods
 *   operationId: getLogin
 *   requestBody:
 *     description: Discord login is requested to obtain data
 *   responses:
 *     '200':
 *       description: The user has successfully logged into the api rest and website
 *     "404":
 *       description: Error in login keys or source code please try again later
 *   security:
 *     - night_api:
 *       - 'write:night'   
 *       - 'read:night'
 * 
 * /auth/logout:  
 *  get:
 *   tags:
 *     - login
 *   summary: Log out of the control rest api
 *   description: Log out of the control rest api to be able to access different data and methods
 *   operationId: getLogout
 *   requestBody:
 *     description: Discord logout is requested to obtain data
 *   responses:
 *     '200':
 *        description: The user has successfully logged out of the api rest
 *     "404":
 *        description: Error in logout keys or source code please try again later
 * 
 * /api/login:
 *  post:
 *   tags:
 *     - login
 *   summary: Log in the control rest api
 *   description: Log in the control rest api to be able to access different data and methods
 *   operationId: postLogin
 *   requestBody:
 *     description: Discord login is requested to obtain data
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/register'
 *       application/xml:
 *          $ref: '#/components/schemas/register'
 *       application/x-www-form-urlencoded:
 *          $ref: '#/components/schemas/register'
 *   responses:
 *     '200':
 *       description: The user has successfully logged into the api rest
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *         application/xml:
 *           schema:
 *            $ref: '#/components/schemas/register'
 *     "404":
 *       description: Error in login keys or source code please try again later
 *   security:
 *     - night_auth:
 *       - 'write:night'
 *       - 'read:night'
 */

router.get('/auth/logout', authInspection, logMiddleware, authLogout);
router.get('/auth/login', logMiddleware, passport.authenticate('discord', {
      failureRedirect: '/auth/logout',
   }), (req: Request, res: Response) => {
      res.redirect('/');
   }
);

router.post("/api/register", logMiddleware, registerCtrl);
router.post('/api/login/user', logMiddleware, postUser);
router.post('/api/login', logMiddleware, loginCtrl);

export { router };
