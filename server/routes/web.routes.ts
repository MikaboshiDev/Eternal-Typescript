import { authInspection } from '../middleware/auth.middleware';
import { devMiddlware } from '../middleware/dev.middlware';
import { logWithLabel } from '../../src/utils/console';
import ProductModel from '../../src/models/products';
import { Router, Request, Response } from 'express';
import MsgModel from '../../src/models/messages';
import { client } from '../../src/index';
const router = Router();
import path from 'path';
import fs from 'fs';

router.get('/', (req: Request, res: Response) => {
   res.render('login.ejs', {
      user: req.user,
      _client: client,
   });
});

router.get('/error', (req: Request, res: Response) => {
   res.render('error.ejs', {
      user: req.user,
      r_client: client,
   });
});

router.get(
   '/dashboard',
   authInspection,
   async (req: Request, res: Response) => {
      try {
         const messages = await MsgModel.find()
            .sort({ createdAt: -1 })
            .limit(4);
         if (!req.user) return res.redirect('/error');
         res.render('welcome.ejs', {
            user: req.user,
            r_client: client,
            avatarURL: function (id: string) {
               const user = client.users.cache.get(id);
               if (user)
                  return user.avatarURL({ forceStatic: true, size: 4096 });
               else return 'https://cdn.discordapp.com/embed/avatars/0.png';
            },
            timeAgo: function (date: Date) {
               return require('moment')(date).fromNow();
            },
            messages: messages,
         });
      } catch (err) {
         console.error(err);
         return res.send(`<script>alert('Internal server error!');</script>`);
      }
   }
);

router.get('/products', authInspection, async (req: Request, res: Response) => {
   try {
      const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
      const products = await ProductModel.find()
         .sort({ createdAt: -1 })
         .limit(20);
      res.render('products.ejs', {
         user: req.user,
         r_client: client,
         products: products,
         avatarURL: function (id: string) {
            const user = client.users.cache.get(id);
            if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
            else return 'https://cdn.discordapp.com/embed/avatars/0.png';
         },
         timeAgo: function (date: Date) {
            return require('moment')(date).fromNow();
         },
         messages: messages,
      });
   } catch (err) {
      console.error(err);
      return res.send(`<script>alert('Internal server error!');</script>`);
   }
});

router.get(
   '/add-product',
   authInspection,
   async (req: Request, res: Response) => {
      try {
         const messages = await MsgModel.find()
            .sort({ createdAt: -1 })
            .limit(4);
         res.render('add-product.ejs', {
            user: req.user,
            r_client: client,
            avatarURL: function (id: string) {
               const user = client.users.cache.get(id);
               if (user)
                  return user.avatarURL({ forceStatic: true, size: 4096 });
               else return 'https://cdn.discordapp.com/embed/avatars/0.png';
            },
            timeAgo: function (date: Date) {
               return require('moment')(date).fromNow();
            },
            messages: messages,
         });
      } catch (err) {
         console.error(err);
         return res.send(`<script>alert('Internal server error!');</script>`);
      }
   }
);

router.get('/client', authInspection, async (req: Request, res: Response) => {
   try {
      const messages = await MsgModel.find().sort({ createdAt: -1 }).limit(4);
      const directoryPath = './src/logs';
      async function getFiles() {
         return new Promise((resolve, reject) => {
            fs.readdir(directoryPath, (err: any, files: any[]) => {
               if (err) {
                  console.error(err);
                  reject(err);
               } else {
                  const archives = files.map((file) => ({
                     name: file,
                     downloadLink: `/download/${encodeURIComponent(file)}`,
                  }));
                  resolve(archives);
               }
            });
         });
      }

      const archives = await getFiles();
      res.render('client.ejs', {
         user: req.user,
         r_client: client,
         avatarURL: function (id: string) {
            const user = client.users.cache.get(id);
            if (user) return user.avatarURL({ forceStatic: true, size: 4096 });
            else return 'https://cdn.discordapp.com/embed/avatars/0.png';
         },
         timeAgo: function (date: Date) {
            return require('moment')(date).fromNow();
         },
         messages: messages,
         files: archives,
         clientPing: client.ws.ping,
         archives: archives,
      });
   } catch (err) {
      console.error(err);
      return res.send(`<script>alert('Internal server error!');</script>`);
   }
});

router.get(
   '/download/:file',
   authInspection,
   devMiddlware,
   async (req: Request, res: Response) => {
      try {
         const file = req.params.file;
         const directoryPath = './src/logs';
         const filePath = path.join(directoryPath, file);

         try {
            await fs.promises.access(filePath, fs.constants.F_OK);
         } catch (error) {
            return res.send(`<script>alert('File not found!');</script>`);
         }

         res.download(filePath, file);
      } catch (err) {
         console.error(err);
         return res.send(`<script>alert('Internal server error!');</script>`);
      }
   }
);

router.delete(
   '/delete/:file',
   authInspection,
   async (req: Request, res: Response) => {
      try {
         const file = req.params.file;
         const directoryPath = './logs';
         await fs.promises.unlink(`${directoryPath}/${file}`);
      } catch (err) {
         console.error(err);
         logWithLabel('routes', 'Failed to delete file');
         return res.send(`<script>alert('Internal server error!');</script>`);
      }
   }
);

router.get(
   '/policies',
   authInspection,
   async (req: Request, res: Response) => {
      try {
         const messages = await MsgModel.find()
            .sort({ createdAt: -1 })
            .limit(4);
         if (!req.user) return res.redirect('/error');
         res.render('policies.ejs', {
            user: req.user,
            r_client: client,
            avatarURL: function (id: string) {
               const user = client.users.cache.get(id);
               if (user)
                  return user.avatarURL({ forceStatic: true, size: 4096 });
               else return 'https://cdn.discordapp.com/embed/avatars/0.png';
            },
            timeAgo: function (date: Date) {
               return require('moment')(date).fromNow();
            },
            messages: messages,
         });
      } catch (err) {
         console.error(err);
         return res.send(`<script>alert('Internal server error!');</script>`);
      }
   }
);

export { router };
