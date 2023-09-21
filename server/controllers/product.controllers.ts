import { registerUpload } from '../service/upload.service';
import { Storage } from '../interface/upload.interface';
import { RequestExt } from '../interface/req.interface';
import { EmbedBuilder } from 'discord.js';
import { client } from '../../src/index';
import fs from 'node:fs';
import path from 'node:path';
import { logWithLabel } from '../../src/utils/console';
import model from '../../src/models/products';
import { Request, Response } from 'express';

/**
 * The function `getProducts` retrieves data from a model and returns it as a JSON response.
 * @param {Request} req - The `req` parameter represents the incoming request object, which contains
 * information about the HTTP request made by the client. It includes details such as the request
 * method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a response object with a status code of 200 and a JSON object containing the data retrieved
 * from the model.
 */
const getProducts = async (req: Request, res: Response) => {
  const data = await model.find();
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
  if (data.length === 0) return res.status(404).json({ message: 'NOT_FOUND' });

  return res.status(200).json({ data });
};

/**
 * The function `getProduct` retrieves a product from the database based on the provided ID and returns
 * it in the response.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a response object with a status code of 200 and a JSON object containing the data found in
 * the database.
 */
const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await model.findOne({ id });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

  return res.status(200).json({ data });
};

/**
 * The function `addProduct` is an asynchronous function that handles the request to add a new product
 * to the database.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with a status code and a message. If the data already exists, it returns a
 * 409 status code with a message of 'CONFLICT'. If the data is successfully saved, it returns a 200
 * status code with a message of 'OK' and the saved data. If there is an error during the saving
 * process, it returns a 500 status code with
 */
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

/**
 * The function `editProduct` updates a product in a database based on the provided request parameters
 * and body.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with a status code of 200 and a message of 'OK'. It also includes the
 * updated data object.
 */
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

/**
 * The function deletes a product from the database based on the provided ID.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a response with a status code and a JSON object. If the data is not found, it returns a 404
 * status code with a message of 'NOT_FOUND'. If the data is found and successfully deleted, it returns
 * a 200 status code with a message of 'OK'.
 */
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await model.findOne({ id });
  if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

  await model.findOneAndDelete({ id });
  return res.status(200).json({ message: 'OK' });
};

/**
 * The function sends a product recommendation message to a Discord channel.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties for setting the response status,
 * headers, and body. In this code, it is used to send a JSON response with a status code and a
 * message.
 * @returns a JSON response with a status code of 200 and a message of 'OK' if the channel is
 * successfully found and the message is sent. If there is an error, it will return a JSON response
 * with a status code of 500 and a message of 'INTERNAL_SERVER_ERROR'. If the channel is not found, it
 * will return a JSON response with a status code of
 */
const recomendProduct = async (req: Request, res: Response) => {
  const channel = client.channels.cache.get(process.env.channel_web!);
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

/**
 * The getFile function is an asynchronous function that handles a request to register a file upload,
 * extracting relevant data from the request object and sending a response with the result of the
 * registration.
 * @param {RequestExt} req - The `req` parameter is an object that represents the HTTP request made to
 * the server. It contains information such as the request headers, request body, request method,
 * request URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which is typically provided by a web
 * framework like Express.js.
 */
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

/**
 * The function `getFiles` reads the files in a specified folder and returns a JSON response containing
 * the list of files.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
const getFiles = async (req: Request, res: Response) => {
  try {
    const folderPath = './upload';
    fs.readdir(folderPath, (err, files) => {
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

export { getProducts, getProduct, addProduct, getFile, getFiles, editProduct, deleteProduct, recomendProduct };
