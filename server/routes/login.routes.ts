import { loginCtrl, registerCtrl } from '../controllers/auth.controllers';
import { authLogout, postUser } from '../controllers/login.controllers';
import { authInspection } from '../middleware/auth.middleware';
import { logMiddleware } from '../middleware/logs.middlware';
import { Router, Response, Request } from 'express';
import { passport } from '../../src/utils/passport';
const router = Router();

/**
 * @openapi
 * /auth/login:
 *  get:
 *   tags:
 *     - Website
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
 *     - Website
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
 * /api/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register inside the control api
 *    description: Register within the control api to access its functions
 *    operationId: postRegister
 *    requestBody:
 *       description: JWT token generation and encrypted data
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/api_auth'
 *          application/xml:
 *             schema:
 *                $ref: '#/components/schemas/api_auth'
 *          application/x-www-form-urlencoded:
 *                $ref: '#/components/schemas/api_auth'
 *    responses:
 *      '200':
 *        description: The user has successfully registered in the api rest
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/api_auth'
 *          application/xml:
 *             schema:
 *                $ref: '#/components/schemas/api_auth'
 *          application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/api_auth'
 *      "404":
 *        description: Error in register keys or source code please try again later
 *
 * /api/login:
 *  post:
 *   tags:
 *     - Auth
 *   summary: Log in the control rest api
 *   description: Log in the control rest api to be able to access different data and methods
 *   operationId: postLogin
 *   requestBody:
 *     description: Discord login is requested to obtain data
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/api_auth'
 *       application/xml:
 *          $ref: '#/components/schemas/api_auth'
 *       application/x-www-form-urlencoded:
 *          $ref: '#/components/schemas/api_auth'
 *   responses:
 *     '200':
 *       description: The user has successfully logged into the api rest
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api_auth'
 *         application/xml:
 *           schema:
 *            $ref: '#/components/schemas/api_auth'
 *     "404":
 *       description: Error in login keys or source code please try again later
 *
 * /api/login/user:
 *    post:
 *      tags:
 *        - Users
 *      summary: Log in the control rest api
 *      description: register your discord server user for your products, data and statistics control
 *      operationId: postUser
 *      requestBody:
 *        description: Discord login is requested to obtain data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/register'
 *          application/xml:
 *              $ref: '#/components/schemas/register'
 *          application/x-www-form-urlencoded:
 *              $ref: '#/components/schemas/register'
 *      responses:
 *        '200':
 *           description: The user has successfully logged into the api rest
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/register'
 *             application/xml:
 *                 $ref: '#/components/schemas/register'
 *             application/x-www-form-urlencoded:
 *                 $ref: '#/components/schemas/register'
 *        "404":
 *          description: Error in login keys or source code please try again later
 *
 */

//? Auth Routes Web //
router.get('/auth/logout', authInspection, logMiddleware, authLogout);
router.get(
   '/auth/login',
   logMiddleware,
   passport.authenticate('discord', {
      failureRedirect: '/auth/logout',
   }),
   (req: Request, res: Response) => {
      res.redirect('/');
   }
);

//? Auth Routes Api //
router.post('/api/register', logMiddleware, registerCtrl);
router.post('/api/login/user', logMiddleware, postUser);
router.post('/api/login', logMiddleware, loginCtrl);

export { router };
