import { Router, Request, Response } from "express";
import { logMiddleware } from "../middleware/logs.middlware";
import { authInspection } from "../middleware/auth.middleware";
import { devMiddlware } from "../middleware/dev.middlware";
import { getAllUsers, getBans, getStatus } from "../controllers/dev.controllers";
import { checkJwt } from "../middleware/session.middlware";
import { checkSegurity } from "../middleware/segurity.middlware";
const router = Router();
router.use(logMiddleware, authInspection, devMiddlware, checkJwt, checkSegurity);
/**
 * @openapi
 * /api/status:
 *   get:
 *     tags:
 *        - Dev
 *     summary: Get the status of the bot (only for developers)
 *     description: Get the status of the bot (only for developers) for the dashboard
 *     operationId: getStatus
 *     requestBody:
 *        description: Get the status of the bot (only for developers) for the dashboard (only for developers)
 *     responses:
 *       '200':
 *          description: OK and return the status of the bot
 *       "401":
 *          description: Unauthorized and return the message of error
 *       "500":
 *          description: Internal Server Error and return the message of error
 * 
 * /api/status/users:
 *   get:
 *     tags:
 *       - Dev
 *     summary: Get all users (only for developers)
 *     description: Get all users registered in the database (only for developers) for the dashboard
 *     operationId: getAllUsers
 *     requestBody: 
 *        description: Get all users registered in the database (only for developers) for the dashboard (only for developers)
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/api_auth'
 *           application/xml:
 *              schema:
 *                  $ref: '#/components/schemas/api_auth'
 *           application/x-www-form-urlencoded:
 *              schema:
 *                  $ref: '#/components/schemas/api_auth'
 *     responses:
 *       '200':
 *          description: OK and return all users registered in the database
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/api_auth'
 *              application/xml:
 *                  schema:
 *                      $ref: '#/components/schemas/api_auth'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/api_auth'
 *       "401":
 *          description: Unauthorized and return the message of error
 *       "500":
 *          description: Internal Server Error and return the message of error 
 * 
 * /api/status/bans:
 *   get:
 *    tags:
 *      - Dev
 *    summary: Get all bans.
 *    description: Get all bans from the server is the bot is in (only for developers) for the dashboard
 *    operationId: getBans
 *    requestBody: 
 *      description: Get all bans from the server is the bot is in (only for developers) for the dashboard (only for developers)
 *    responses:
 *      '200':
 *         description: OK and return all bans from the server
 *      "401":
 *         description: Unauthorized and return the message of error
 *      "500":
 *         description: Internal Server Error and return the message of error
 *   
 */

router.get("/api/status", getStatus);
router.get("/api/status/users", getAllUsers);
router.get("/api/status/bans", getBans);

export { router }