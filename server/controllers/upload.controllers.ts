import { registerUpload } from '../service/upload.service';
import { Storage } from '../interface/upload.interface';
import { RequestExt } from '../interface/req.interface';
import { Request, Response } from 'express';

const getFile = async (req: RequestExt, res: Response) => {
   try {
      const { user, file } = req;
      const dataToRegister: Storage = {
         fileName: `${file?.filename}`,
         idUser: `${user?.id}`,
         path: `${file?.path}`,
      };
      const response = await registerUpload(dataToRegister);
      res.send(response);
   } catch (e) {}
};

export { getFile };
