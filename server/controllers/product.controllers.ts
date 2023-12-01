import { registerUpload } from '../service/upload.service';
import { logWithLabel } from '../../src/utils/console';
import { RequestExt, Storage } from '../../global';
import model from '../../src/models/products';
import { Request, Response } from 'express';
import { client } from '../../src/shulker';
import { EmbedBuilder } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';

const getProducts = async (req: Request, res: Response) => {
  const data = await model.find();
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
  if (data.length === 0) return res.status(404).json({ message: 'NOT_FOUND' });

  return res.status(200).json({ data });
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await model.findOne({ id });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

  return res.status(200).json({ data });
};

const addProduct = async (req: Request, res: Response) => {
  const { name, id, price, description, image, category, quantity, date } = req.body;
  const data = await model.findOne({ id });
  if (data) return res.status(409).json({ message: 'CONFLICT' });

  const modelCreate = new model({
    name: name,
    id: id,
    price: price,
    description: description,
    image: image,
    category: category,
    quantity: quantity,
    date: date,
  });

  const save = await modelCreate.save();
  if (!save) return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  return res.status(200).json({
    message: 'OK',
    data: save,
  });
};

const editProduct = async (req: Request, res: Response) => {
  const { name, price, description, image, category, quantity, date } = req.body;
  const { id } = req.params;

  const data = await model.findOne({ id });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

  await model.findOneAndUpdate(
    { id },
    {
      name: name,
      price: price,
      description: description,
      image: image,
      category: category,
      quantity: quantity,
      date: date,
    }
  );

  return res.status(200).json({
    message: 'OK',
    data: data,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await model.findOne({ id });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

  await model.findOneAndDelete({ id });
  return res.status(200).json({ message: 'OK' });
};

const recomendProduct = async (req: Request, res: Response) => {
  const channel = client.channels.cache.get(client.config.api_client.channel_web!);
  if (!channel?.isTextBased()) return res.status(404).json({ message: 'NOT_FOUND' });

  channel
    .send({
      embeds: [
        new EmbedBuilder()
          .setColor('Green')
          .setAuthor({
            name: 'Product - Recomendation',
            iconURL: client.user?.displayAvatarURL(),
            url: 'https://discord.js.org',
          })
          .setTitle('Product - Recomendation')
          .setDescription('A new product has been added to the store')
          .setThumbnail(req.body.image)
          .addFields(
            { name: 'Name', value: req.body.name, inline: true },
            {
              name: 'Day',
              value: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
              inline: true,
            },
            {
              name: 'Description',
              value: req.body.description,
              inline: false,
            },
            { name: 'Category', value: req.body.category, inline: true },
            { name: 'User Owner', value: req.body.user, inline: true }
          ),
      ],
    })
    .catch((err) => {
      res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    });
  return res.status(200).json({ message: 'OK' });
};

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
    const folderPath = './config/upload';
    fs.readdir(folderPath, (err, files: string[]) => {
      if (err) {
        logWithLabel('error', `The folder could not be read: ${err}`);
        return res.status(500).json({ error: 'The folder could not be read' });
      }

      const archivos = files.filter((file) => {
        const filePath = path.join(folderPath, file);
        return fs.statSync(filePath).isFile();
      });
      res.json({ archivos });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};

export { addProduct, deleteProduct, editProduct, getFile, getFiles, getProduct, getProducts, recomendProduct };
