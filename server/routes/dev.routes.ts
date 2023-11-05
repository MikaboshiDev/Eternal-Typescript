/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { getAllUsers, getBans, getStatus } from '../controllers/owner.controllers';
import { devMiddlware } from '../middleware/auth.middleware';
import { checkJwt } from '../middleware/session.middlware';
import { Router } from 'express';
const router = Router();
/**
 * @openapi
 * /api/v1/status:
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
 * /api/v1/status/users:
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
 * /api/v1/status/bans:
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

router.get('/api/v1/status/users', getAllUsers, devMiddlware, checkJwt);
router.get('/api/v1/status/bans', getBans, checkJwt);
router.get('/api/v1/status', getStatus, checkJwt);

export { router };
