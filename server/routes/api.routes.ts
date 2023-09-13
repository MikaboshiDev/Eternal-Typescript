import {
   addProduct,
   deleteProduct,
   editProduct,
   getProduct,
   getProducts,
   recomendProduct,
} from '../controllers/product.controllers';
import { getFile, getFiles } from '../controllers/upload.controllers';
import { logMiddleware } from '../middleware/logs.middlware';
import { getUser } from '../controllers/login.controllers';
import { checkJwt } from '../middleware/session.middlware';
import multerMiddleware from '../middleware/file.middlware';
import { devMiddlware } from '../middleware/dev.middlware';
import { Router } from 'express';
import { authInspection } from '../middleware/auth.middleware';
import { checkSegurity } from '../middleware/segurity.middlware';
import { postApelation } from '../controllers/users.controllers';
import { postMessages } from '../controllers/dev.controllers';
const router = Router();

/**
 * @openapi
 * /api/users/{user}:
 *  get:
 *   tags:
 *     - Users
 *   summary: Get your profile information within the api
 *   description: Obtain the information of your profile within the api for the validation of technical data of use
 *   parameters:
 *     - name: id
 *       in: path
 *       description: User id to obtain the information of your profile product
 *       required: true
 *       explode: false
 *       schema:
 *         type: number
 *         format: uuid
 *   operationId: getProfile
 *   requestBody:
 *     description: User id to obtain the information of your profile
 *     content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/api_register'
 *       application/xml:
 *          $ref: '#/components/schemas/api_register'
 *       application/x-www-form-urlencoded:
 *          $ref: '#/components/schemas/api_register'
 *   responses:
 *     '200':
 *       description: User exist in database and return the information of your profile
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api_register'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/api_register'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/api_register'
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
 *      - Api
 *    summary: Upload files via requests
 *    description: Upload files via requests to the host's local files
 *    parameters:
 *      - name: fileName
 *        in: path
 *        description: File name to upload to the host's local files
 *        required: true
 *        explode: false
 *        schema:
 *          type: string
 *      - name: idUser
 *        in: path
 *        description: User id to upload to the host's local files
 *        required: true
 *        explode: false
 *        schema:
 *          type: number
 *        format: uuid
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
 *      "500":
 *       description: Web server is down at the moment, try again later
 *
 * /api/archives:
 *   get:
 *    tags:
 *      - Api
 *    summary: Get files via requests
 *    description: Get files via requests to the host's local files
 *    operationId: getFiles
 *    requestBody:
 *       description: Get files via requests to the host's local files
 *    responses:
 *      '200':
 *        description: Files get successfully to the host's local files
 *      "404":
 *        description: Error in upload file keys or source code please try again later
 *      "500":
 *        description: Web server is down at the moment, try again later
 *
 * /api/products/{product}:
 *   get:
 *    tags:
 *      - Products
 *    summary: Get product information so far
 *    description: Obtain information on the products so far registered by the association
 *    parameters:
 *       - name: name
 *         in: path
 *         description: database product name
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: unique id of the saved product
 *         required: true
 *         explode: false
 *         schema:
 *            type: number
 *       - name: price
 *         in: path
 *         description: estimated or rounded product price
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *         format: float
 *       - name: description
 *         in: path
 *         description: description of the product something introductory about what it does
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *       - name: image
 *         in: path
 *         description: product image an illustration
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *         format: url
 *       - name: category
 *         in: path
 *         description: category in which the product is found
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: path
 *         description: intermediate price of estimated products
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *       - name: date
 *         in: path
 *         description: date the product was saved
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *    operationId: getProduct
 *    requestBody:
 *      description: Product id to obtain the information of your profile
 *      content:
 *        application/json:
 *            schema:
 *               $ref: '#/components/schemas/api_product'
 *        application/xml:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *        application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *    responses:
 *      '200':
 *         description: Product exist in database and return the information of your profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api_product'
 *      "404":
 *         description: Product not found in database and return the message of error
 *      "500":
 *         description: Web server is down at the moment, try again later
 *
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all product information so far
 *     description: Obtain information on all products so far registered by the association
 *     operationId: getProducts
 *     requestBody:
 *        description: Get all product information so far
 *     responses:
 *      '200':
 *        description: Product exist in database and return the information of your profile
 *      "404":
 *        description: Product not found in database and return the message of error
 *      "500":
 *        description: Web server is down at the moment, try again later
 *
 * /api/products/add-product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Add product information so far
 *     description: Add information on the products so far registered by the association
 *     parameters:
 *       - name: name
 *         in: path
 *         description: database product name
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: unique id of the saved product
 *         required: true
 *         explode: false
 *         schema:
 *            type: number
 *       - name: price
 *         in: path
 *         description: estimated or rounded product price
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *         format: float
 *       - name: description
 *         in: path
 *         description: description of the product something introductory about what it does
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *       - name: image
 *         in: path
 *         description: product image an illustration
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *         format: url
 *       - name: category
 *         in: path
 *         description: category in which the product is found
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: path
 *         description: intermediate price of estimated products
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *       - name: date
 *         in: path
 *         description: date the product was saved
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *     operationId: addProduct
 *     requestBody:
 *        description: Add product information so far
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/api_product'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *     responses:
 *      '200':
 *         description: Product exist in database and return the information of your profile
 *         content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/api_product'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/api_product'
 *      "404":
 *         description: Product not found in database and return the message of error
 *      "500":
 *         description: Web server is down at the moment, try again later
 *
 * /api/products/edit-product/{product}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Edit product information so far by id
 *     description: Edit information on the products so far registered by the association by id product
 *     parameters:
 *       - name: name
 *         in: path
 *         description: database product name
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: unique id of the saved product
 *         required: true
 *         explode: false
 *         schema:
 *            type: number
 *       - name: price
 *         in: path
 *         description: estimated or rounded product price
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *         format: float
 *       - name: description
 *         in: path
 *         description: description of the product something introductory about what it does
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *       - name: image
 *         in: path
 *         description: product image an illustration
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *         format: url
 *       - name: category
 *         in: path
 *         description: category in which the product is found
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: path
 *         description: intermediate price of estimated products
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *       - name: date
 *         in: path
 *         description: date the product was saved
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *     operationId: editProduct
 *     requestBody:
 *       description: Edit product information so far by id
 *     responses:
 *       '200':
 *          description: Product exist in database and return the information of your profile
 *       "404":
 *          description: Product not found in database and return the message of error
 *       "500":
 *          description: Web server is down at the moment, try again later
 *
 * /api/products/delete-product/{product}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product information so far by id
 *     description: Delete information on the products so far registered by the association by id product
 *     parameters:
 *       - name: name
 *         in: path
 *         description: database product name
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         description: unique id of the saved product
 *         required: true
 *         explode: false
 *         schema:
 *            type: number
 *       - name: price
 *         in: path
 *         description: estimated or rounded product price
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *         format: float
 *       - name: description
 *         in: path
 *         description: description of the product something introductory about what it does
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *       - name: image
 *         in: path
 *         description: product image an illustration
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *         format: url
 *       - name: category
 *         in: path
 *         description: category in which the product is found
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: path
 *         description: intermediate price of estimated products
 *         required: true
 *         explode: false
 *         schema:
 *           type: number
 *       - name: date
 *         in: path
 *         description: date the product was saved
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *     operationId: deleteProduct
 *     requestBody:
 *        description: Delete product information so far by id
 *     responses:
 *       '200':
 *         description: Product exist in database and return the information of your profile
 *       "404":
 *         description: Product not found in database and return the message of error
 *       "500":
 *         description: Web server is down at the moment, try again later
 *
 * /api/products/recommendation:
 *   post:
 *     tags:
 *       - Products
 *     summary: Get product recommendation
 *     description: Obtain information on the products so far registered by the association
 *     parameters:
 *       - name: name
 *         in: path
 *         description: database product name
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: description
 *         in: path
 *         description: description of the product something introductory about what it does
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *       - name: image
 *         in: path
 *         description: product image an illustration
 *         required: true
 *         explode: false
 *         schema:
 *            type: string
 *         format: url
 *       - name: category
 *         in: path
 *         description: category in which the product is found
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *     operationId: recomendProduct
 *     requestBody:
 *       description: Product id to obtain the information of your profile
 *       content:
 *         application/json:
 *             schema:
 *                $ref: '#/components/schemas/api_recommend_product'
 *         application/xml:
 *             schema:
 *                $ref: '#/components/schemas/api_recommend_product'
 *         application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/api_recommend_product'
 *     responses:
 *       '200':
 *          description: Product exist in database and return the information of your profile
 *       "404":
 *          description: Product not found in database and return the message of error
 *       "500":
 *          description: Web server is down at the moment, try again later
 *
 * /api/users/apelation/{user}:
 *  post:
 *    tags:
 *      - Users
 *    summary: Apelation user
 *    description: URL for appeals to scheduled discord servers
 *    operationId: postApelation
 *    requestBody:
 *       description: Apelation user
 *    responses:
 *       '200':
 *          description: Apelation user
 *       "404":
 *          description: User not found in database and return the message of error
 *       "500":
 *          description: Web server is down at the moment, try again later
 *
 * /api/users/report:
 *  post:
 *    tags:
 *       - Users
 *    summary: Report user
 *    description: URL for reports to scheduled discord servers the user is in the server and the bot has access to the server
 *    operationId: postReport
 *    requestBody:
 *       description: Report user in the server
 *    responses:
 *       '200':
 *          description: Report user in the server
 *       "404":
 *          description: User not found in database and return the message of error
 *       "500":
 *          description: Web server is down at the moment, try again later
 *
 * /api/messages:
 *  post:
 *    tags:
 *      - Api
 *    summary: Post messages to the server
 *    description: Post messages to the server for the user to see the messages in the chat
 *    operationId: postMessages
 *    requestBody:
 *       description: Post messages to the server for the user to see the messages in the chat
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/api_message'
 *          application/xml:
 *             schema:
 *                $ref: '#/components/schemas/api_message'
 *          application/x-www-form-urlencoded:
 *             schema:
 *                $ref: '#/components/schemas/api_message'
 *    responses:
 *      '200':
 *          description: Post messages to the server for the user to see the messages in the chat
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/api_message'
 *             application/xml:
 *                schema:
 *                   $ref: '#/components/schemas/api_message'
 *             application/x-www-form-urlencoded:
 *                schema:
 *                   $ref: '#/components/schemas/api_message'
 *      "404":
 *          description: Error in upload file keys or source code please try again later
 *      "500":
 *          description: Web server is down at the moment, try again later
 *
 */

//? Api Archives //
router.post(
   '/api/archives/upload',
   checkJwt,
   multerMiddleware.single('myfile'),
   getFile
);
router.get('/api/archives', getFiles, checkJwt);

//? Api Products //
router.delete(
   '/api/products/delete-product/:product',
   checkJwt,
   devMiddlware,
   deleteProduct
);
router.put(
   '/api/products/edit-product/:product',
   editProduct,
   devMiddlware,
   checkJwt
);

router.post('/api/products/recommendation', recomendProduct, checkJwt);
router.post('/api/products/add-product', addProduct, devMiddlware, checkJwt);
router.get('/api/products/:product', getProduct, checkJwt);
router.get('/api/products', getProducts, checkJwt);

//? Api Users //
router.post('/api/users/apelation/:user', postApelation, checkJwt);
router.post('/api/users/report', postApelation, checkJwt);
router.get('/api/users/:user', getUser, checkJwt);

//? Api Website Config //
router.post('/api/messages', checkJwt, postMessages, devMiddlware);

export { router };
