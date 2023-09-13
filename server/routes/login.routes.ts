import { loginCtrl, registerCtrl } from '../controllers/auth.controllers';
import { authLogout, postUser } from '../controllers/login.controllers';
import { authInspection } from '../middleware/auth.middleware';
import { logMiddleware } from '../middleware/logs.middlware';
import { Router, Response, Request } from 'express';
import { passport } from '../../src/utils/passport';
import { checkJwt } from '../middleware/session.middlware';
import { checkSegurity } from '../middleware/segurity.middlware';
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
 * /api/v1/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register inside the control api
 *    description: Register within the control api to access its functions
 *    parameters:
 *       - name: name
 *         in: query
 *         description: The name of the user to register
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: The password of the user to register
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         description: The email of the user to register
 *         required: true
 *         schema:
 *           type: string
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
 *             schema:
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
 * /api/v1/login:
 *  post:
 *   tags:
 *     - Auth
 *   summary: Log in the control rest api
 *   description: Log in the control rest api to be able to access different data and methods
 *   parameters:
 *       - name: password
 *         in: query
 *         description: The password of the user to register
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         description: The email of the user to register
 *         required: true
 *         schema:
 *           type: string
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
 *         application/x-www-form-urlencoded:
 *           schema:
 *            $ref: '#/components/schemas/api_auth'
 *     "404":
 *       description: Error in login keys or source code please try again later
 *
 * /api/v1/login/user:
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
 *              $ref: '#/components/schemas/api_register'
 *          application/xml:
 *              $ref: '#/components/schemas/api_register'
 *          application/x-www-form-urlencoded:
 *              $ref: '#/components/schemas/api_register'
 *      responses:
 *        '200':
 *           description: The user has successfully logged into the api rest
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/api_register'
 *             application/xml:
 *                 $ref: '#/components/schemas/api_register'
 *             application/x-www-form-urlencoded:
 *                 $ref: '#/components/schemas/api_register'
 *        "404":
 *          description: Error in login keys or source code please try again later
 *
 */

//? Auth Routes Web //
router.get('/auth/logout', logMiddleware, authInspection, authLogout);
router.get(
   '/auth/login',
   passport.authenticate('discord', {
      failureRedirect: '/auth/logout',
   }),
   (req: Request, res: Response) => {
      res.redirect('/dashboard');
   }
);

//? Auth Routes Api //
router.post('/api/v1/register', registerCtrl);
router.post('/api/v1/login/user', postUser, checkJwt);
router.post('/api/v1/login', loginCtrl);

export { router };
