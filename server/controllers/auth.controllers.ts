import { Request, Response } from 'express';
import {
   Authdelete,
   loginUser,
   registerNewUser,
} from '../service/auth.service';
import { enviarCorreo } from '../../src/structure/nodemailer';
import { apiError } from '../../src/utils/errors';
import model from '../../src/models/model';

const registerCtrl = async ({ body }: Request, res: Response) => {
   const response = await registerNewUser(body);
   res.send(response);
   enviarCorreo(
      body.email,
      'You just signed up for Night Support Api',
      [
         'Welcome to Night Support Api',
         'These are the details of your registration account, remember to save them in case they are necessary in the future.',
         `Name: ${body.name}`,
         `Email: ${body.email}`,
         `Password: ${body.password}\n`,
         'Thanks for using our services.',
         `Atte: Night Support Api`,
      ].join('\n')
   );
};

const loginCtrl = async ({ body }: Request, res: Response) => {
   const { email, password } = body;
   const response = await loginUser({ email, password });
   res.send(response);
};

const deleteAuths = async ({ body }: Request, res: Response) => {
   const { email, password } = body;
   const response = await Authdelete({ email, password });
   res.send(response);
};

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

export { registerCtrl, loginCtrl, deleteAuths, getUser, postUser, authLogout };
