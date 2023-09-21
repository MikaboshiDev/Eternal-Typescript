import { Request, Response, NextFunction } from 'express';
import { client } from '../../src/index';

/**
 * The authInspection function checks if a user is authenticated and redirects them to the login page
 * if they are not.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as the request headers, request body, and request
 * parameters.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to send data back to the client, such as HTML, JSON, or error
 * messages.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns In this code snippet, if the user is not authenticated, a redirect to '/auth/login' is
 * being returned. Otherwise, the 'next()' function is being called, allowing the request to proceed to
 * the next middleware or route handler.
 */
const authInspection = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.redirect('/auth/login');
  next();
};

/**
 * The `devMiddleware` function is an asynchronous middleware that checks if a user is an administrator
 * in a guild before allowing access to the next middleware.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that represents the HTTP response
 * that will be sent back to the client. It is used to send the response data, set response headers,
 * and control the response status code.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the chain. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * @returns The middleware function is returning a response with a status code and a JSON object
 * containing an error message.
 */
const devMiddlware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.user;
  const user = client.users.cache.get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const serverid = process.env.guild_id || '';
  const guild = client.guilds.cache.get(serverid);
  if (!guild) return res.status(404).json({ error: 'Guild not found' });

  const member = await guild.members.fetch(user.id);
  if (!member || !member.permissions.has('Administrator')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

export { authInspection, devMiddlware };
