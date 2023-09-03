import { logMiddleware } from '../middleware/logs.middlware';
import { getUser } from '../controllers/login.controllers';
import { getFile } from '../controllers/upload.controllers';
import { checkJwt } from '../middleware/session.middlware';
import multerMiddleware from '../middleware/file.middlware';
import { Router } from 'express';
const router = Router();

/**
 * @openapi
 * /api/users/{user}:
 *  get:
 *   tags:
 *     - apiUsers
 *   summary: Get your profile information within the api
 *   description: Obtain the information of your profile within the api for the validation of technical data of use
 *   operationId: getProfile
 *   requestBody:
 *     description: User id to obtain the information of your profile
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
 *       description: User exist in database and return the information of your profile
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     "404":
 *       description: User not found in database and return the message of error
 *   security:
 *     - night_auth: 
 *        - 'write:night'
 *        - 'read:night'  
 * 
 * /api/archives/upload:
 *   post:
 *    tags:
 *      - apiArchive
 *    summary: Upload files via requests
 *    description: Upload files via requests to the host's local files
 *    operationId: postUpload
 *    requestBody:
 *      description: File to upload to the host's local files
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *    responses:
 *      '200':
 *        description: File uploaded successfully to the host's local files
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/api_upload'
 *      "404":
 *        description: Error in upload file keys or source code please try again later
 *        
 */

router.get('/api/users/:user', logMiddleware, getUser);
router.post('/api/archives/upload', checkJwt, multerMiddleware.single('myfile'), getFile);

export { router };
