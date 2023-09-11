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
