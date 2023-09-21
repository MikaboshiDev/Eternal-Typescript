import { NextFunction, Response, Request } from 'express';
import { client } from '../../src';
import 'dotenv/config';

interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
}

/**
 * The function checks if a guild and member exist, and if the member has a required role, before
 * proceeding to the next middleware.
 * @param {Request} req - The `req` parameter is the request object, which contains information about
 * the incoming HTTP request.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to manipulate the response,
 * such as sending data, setting headers, and handling redirects.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the stack. It is typically used to move on to the next step in the
 * request-response cycle.
 * @param {string} requiredRoleId - The `requiredRoleId` parameter is the ID of the role that is
 * required for the member to be authorized.
 * @returns a response with a script tag containing an alert message.
 */
const checkGuildAndMember = (req: Request, res: Response, next: NextFunction, requiredRoleId: string) => {
  const guild = client.guilds.cache.get(process.env.guild_id!);
  if (!guild) return res.send(`<script>alert('Guild not found!');</script>`);

  const member = guild?.members.cache.get((req.user as User).id);
  if (!member) return res.send(`<script>alert('Member not found!');</script>`);
  if (!member.roles.cache.has(requiredRoleId)) return res.send(`<script>alert('You are not authorized!');</script>`);

  next();
};

/**
 * The function `devWebMiddleware` checks if the request is coming from a member with a specific
 * developer role in a guild.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request being made.
 * It contains information such as the request method, URL, headers, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It contains methods and properties for manipulating the response, such as
 * setting headers, sending data, and handling errors.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the chain. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 */
const devWebMiddleware = (req: Request, res: Response, next: NextFunction) => {
  checkGuildAndMember(req, res, next, process.env.developer_role_id!);
};

/**
 * The customerWebMiddleware function checks the guild and member roles in a request and calls the next
 * function if the customer role ID is present.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request being made.
 * It contains information such as the request method, URL, headers, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It contains methods and properties for manipulating the response, such as
 * setting headers, sending data, and handling errors.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the chain. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 */
const customerWebMiddleware = (req: Request, res: Response, next: NextFunction) => {
  checkGuildAndMember(req, res, next, process.env.customer_role_id!);
};

export { devWebMiddleware, customerWebMiddleware };
