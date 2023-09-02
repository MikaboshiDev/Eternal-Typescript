import { Request, Response } from 'express';
import model from '../../src/models/model';
import { apiError } from '../../src/utils/errors';

const getUser = async ({ body }: Request, res: Response) => {
   try {
      const data = await model.findOne({ user_id: body.user_id });
      if (!data)
         return res.status(404).json({ message: 'User not found in database' });
      return res.status(200).json(data);
   } catch (error) {
      apiError(res, `Error in api rest: ${error}`);
   }
};

const postUser = async ({ body }: Request, res: Response) => {
   const data = await model.findOne({ user_id: body.user_id });
   if (data)
      return res
         .status(200)
         .json({ message: 'User exist in database', code: 200 });
   const user = new model({
      username: body.username,
      user_id: body.user_id,
      email: body.email,
   });

   await user.save();
   return res
      .status(200)
      .json({ message: 'User created in database', code: 200 });
};

const authLogout = async (req: Request, res: Response) => {
   res.status(404).json({
      message: 'The login failed in the api rest manager',
      alerts: 'please for in login api rest',
      code: 404,
   });
};

export { getUser, postUser, authLogout };
