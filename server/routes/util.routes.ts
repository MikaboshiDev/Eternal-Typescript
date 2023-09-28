import { logWithLabel } from '../../src/utils/console';
import model_products from '../../src/models/products';
import { Router, Request, Response } from 'express';
import { upload } from '../utils/upload';
import model from '../../src/models/client';
import { client } from '../../src/index';
import multer from 'multer';
const router = Router();
import path from 'path';
import fs from 'fs';

router.get('/transcript/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const filePath = `./upload/transcripts/ticket-${id}.html`;
  const fileExist = fs.existsSync(filePath);
  if (!fileExist) return res.send(`Ticket with ID ${id} doesn't exist.`);
  let fileToSend = fs.readFileSync(filePath, 'utf8');
  res.send(fileToSend);
});

router.get('/transcript/:id/download', (req: Request, res: Response) => {
  const id = req.params.id;
  const filePath = `./upload/transcripts/ticket-${id}.html`;
  const fileExist = fs.existsSync(filePath);
  if (!fileExist) return res.send(`Ticket with ID ${id} doesn't exist.`);
  let fileToSend = fs.readFileSync(filePath, 'utf8');
  res.download(filePath, `ticket-${id}.html`);
});

router.get('/download/:file', async (req: Request, res: Response) => {
  try {
    const file = req.params.file;
    const directoryPath = ['./src/logs', './upload/archives', './upload/transcripts'];
    const filePath =
      path.join(directoryPath[0], file) || path.join(directoryPath[1], file) || path.join(directoryPath[2], file);
    await fs.promises.access(filePath, fs.constants.F_OK);
    res.download(filePath, file);
  } catch (error) {
    res.send(`<script>alert('File not found.')</script>`);
  }
});

router.delete('/delete/:file', async (req: Request, res: Response) => {
  try {
    const file = req.params.file;
    const directoryPath = ['./src/logs', './upload/archives', './upload/transcripts'];
    const filePath =
      path.join(directoryPath[0], file) || path.join(directoryPath[1], file) || path.join(directoryPath[2], file);

    await fs.unlink(filePath, (err) => {
      if (err) {
        res.send(`<script>alert('File not found.')</script>`);
        console.error(err);
      }
    });
    res.send(`<script>alert('File deleted successfully.');</script>`);
  } catch (error) {
    res.send(`<script>alert('File not found.')</script>`);
  }
});

router.get('/data', async (req: Request, res: Response) => {
  res.json({
    usersAll: client.users.cache.filter((usuario) => !usuario.bot).size,
    botsAll: client.users.cache.filter((usuario) => usuario.bot).size,
    clientStatus: client.user?.presence.status || 'offline',
    All: client.users.cache.size,
    clientPing: client.ws.ping,
  });
});

router.post('/aplications/:id', async (req: Request, res: Response) => {
  const data = await model.findOne({ id: req.params.id });
  if (data) return res.json({ error: 'This bot is already in the database.' });

  const { id } = req.params;
  const { username, description, support, prefix, website, image } = req.body;
  const newData = new model({
    id: id,
    username: username,
    image: image,
    description: description || 'Not provided',
    supportServer: support || 'Not provided',
    prefix: prefix,
    website: website || 'Not provided',
  });

  newData.save();
  res.json({ message: 'Bot added to the database.' });
});

router.post('/aplications/add-product', async (req: Request, res: Response) => {
  const { name, id, price, description, image, category, quantity, date } = req.body;
  const data = await model_products.findOne({ id });
  if (data) return res.status(409).json({ message: 'CONFLICT' });

  const modelCreate = new model_products({
    name: name,
    id: id,
    price: price,
    description: description,
    image: image,
    category: category,
    quantity: quantity || 0,
    date: date || Date.now(),
  });

  const save = await modelCreate.save();
  if (!save) return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  return res.status(200).json({
    message: 'OK',
    data: save,
  });
});

router.get('/upload', upload.single('fileToUpload'), async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: 'BAD_REQUEST' });
  return res.status(200).json({ message: 'OK', data: req.file });
});

export { router };
