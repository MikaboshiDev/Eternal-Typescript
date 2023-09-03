import { registerUpload } from '../service/upload.service';
import { Storage } from '../interface/upload.interface';
import { RequestExt } from '../interface/req.interface';
import { Request, Response } from 'express';
import fs from "node:fs"
import path from 'node:path';
import { logWithLabel } from '../../src/utils/console';

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

const getFiles = async (req: Request, res: Response) => {
   try {
      const folderPath = './upload'; 
      fs.readdir(folderPath, (err, files) => {
         if (err) {
            logWithLabel('error', `The folder could not be read: ${err}`);
            return res.status(500).json({ error: 'The folder could not be read' });
         }

         const archivos = files.filter(file => {
            const filePath = path.join(folderPath, file);
            return fs.statSync(filePath).isFile();
         });
         res.json({ archivos });
      });
   } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Server error' });
   }
}

export { getFile, getFiles };
