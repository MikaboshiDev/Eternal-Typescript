/**
 * The `apiError` function logs an error message and returns a JSON response with a 404 status code and
 * a message.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object from the Express
 * framework. It represents the HTTP response that will be sent back to the client.
 * @param {String} error - The "error" parameter is a string that represents the error message.
 * @returns The function `apiError` is returning a JSON response with a status code of 404 and a
 * message property.
 */

import { logWithLabel } from './console';
import { Response } from 'express';
const apiError = async (res: Response, error: String) => {
  logWithLabel('error', `${error}`);
  return res.status(404).json({ message: 'The login failed in the api rest manager' });
};

export { apiError };
