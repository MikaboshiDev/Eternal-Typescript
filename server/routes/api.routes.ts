import {
  addProduct,
  deleteProduct,
  editProduct,
  getFile,
  getFiles,
  getProduct,
  getProducts,
  recomendProduct,
} from '../controllers/product.controllers';
import { Router } from 'express';
import { loginCtrl, postUser, registerCtrl } from '../controllers/auth.controllers';
import { postApelation } from '../controllers/users.controllers';
import { postMessages } from '../controllers/owner.controllers';
import { devMiddlware } from '../middleware/auth.middleware';
import multerMiddleware from '../middleware/file.middlware';
import { checkJwt } from '../middleware/session.middlware';
import { getUser } from '../controllers/auth.controllers';
const router = Router();

/**
 * @openapi
 * /api/v1/users/{user}:
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
 * /api/v1/archives/upload:
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
 * /api/v1/archives:
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
 * /api/v1/products/{product}:
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
 * /api/v1/products:
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
 * /api/v1/products/add-product:
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
 * /api/v1/products/edit-product/{product}:
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
 * /api/v1/products/delete-product/{product}:
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
 * /api/v1/products/recommendation:
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
 * /api/v1/users/apelation/{user}:
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
 * /api/v1/users/report:
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
 * /api/v1/messages:
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

//? Api Archives //
router.post('/api/v1/archives/upload', checkJwt, multerMiddleware.single('myfile'), getFile);
router.get('/api/v1/archives', getFiles, checkJwt);

//? Api Products //
router.delete('/api/v1/products/delete-product/:product', checkJwt, devMiddlware, deleteProduct);
router.put('/api/v1/products/edit-product/:product', editProduct, devMiddlware, checkJwt);

router.post('/api/v1/products/recommendation', recomendProduct, checkJwt);
router.post('/api/v1/products/add-product', addProduct, devMiddlware, checkJwt);
router.get('/api/v1/products/:product', getProduct, checkJwt);
router.get('/api/v1/products', getProducts, checkJwt);

//? Api Users //
router.post('/api/v1/users/apelation/:user', postApelation, checkJwt);
router.post('/api/v1/users/report', postApelation, checkJwt);
router.get('/api/v1/users/:user', getUser, checkJwt);

//? Api Website Config //
router.post('/api/v1/messages', checkJwt, postMessages, devMiddlware);

//? Auth Routes Api //
router.post('/api/v1/register', registerCtrl);
router.post('/api/v1/login/user', postUser, checkJwt);
router.post('/api/v1/login', loginCtrl);

export { router };
