import { logWithLabel } from './console';
import { Response } from 'express';
const apiError = async (res: Response, error: String) => {
   logWithLabel('error', `${error}`);
   return res
      .status(404)
      .json({ message: 'The login failed in the api rest manager' });
};

export { apiError };
