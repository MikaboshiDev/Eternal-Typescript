import { Request, Response } from 'express';
import {
   Authdelete,
   loginUser,
   registerNewUser,
} from '../service/auth.service';
import { enviarCorreo } from '../../src/structure/nodemailer';

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

export { registerCtrl, loginCtrl, deleteAuths };
