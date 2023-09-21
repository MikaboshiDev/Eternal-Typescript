import UserModel from '../../src/models/auth';
import MsgModel from '../../src/models/messages';
import { Request, Response } from 'express';
import { client } from '../../src/index';
import moment from 'moment';

/**
 * The getStatus function returns the status of the client, including the number of users, guilds,
 * channels, emojis, and the uptime.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to set the status code, headers, and body of the response.
 * @returns The function `getStatus` returns a JSON response with a status code of 200. The response
 * includes a message of 'OK' and a data object containing the following properties:
 */
const getStatus = (req: Request, res: Response) => {
  const users = client.users.cache.size;
  const guilds = client.guilds.cache.size;
  const channels = client.channels.cache.size;
  const emojis = client.emojis.cache.size;

  return res.status(200).json({
    message: 'OK',
    data: {
      users: users,
      guilds: guilds,
      channels: channels,
      emojis: emojis,
      uptime: moment(client.uptime).format('HH:mm:ss'),
    },
  });
};

/**
 * The function getAllUsers retrieves all users from the UserModel and returns them as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this case, the `res` object is used to send a JSON response with a
 * status
 * @returns a response with a status code of 200 and a JSON object containing a message and the data
 * retrieved from the UserModel.find() method.
 */
const getAllUsers = async (req: Request, res: Response) => {
  const data = await UserModel.find();
  return res.status(200).json({
    message: 'OK',
    data: data,
  });
};

/**
 * The function `getBans` retrieves the list of banned users from a guild and returns it as a JSON
 * response.
 * @param {Request} req - The `req` parameter represents the incoming request object, which contains
 * information about the HTTP request made by the client. It includes details such as the request
 * method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties for manipulating the response, such as
 * setting the status code, setting headers, and sending the response body.
 * @returns The function `getBans` returns a Promise that resolves to a Response object. The Response
 * object has a status code and a JSON body. If the guild is not found, it returns a 500 status code
 * with a message of 'Internal Server Error'. If the guild is found, it returns a 200 status code with
 * a message of 'OK' and the bans data in the response body
 */
const getBans = async (req: Request, res: Response) => {
  const guild = client.guilds.cache.get(process.env.guild_id!);
  if (!guild) return res.status(500).json({ message: 'Internal Server Error' });

  const bans = await guild?.bans.fetch();
  return res.status(200).json({ message: 'OK', data: bans });
};

/**
 * The function `postMessages` saves a new message to the database if it doesn't already exist and
 * returns the saved message.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with a status code of 200 and a message of 'OK'. If the data already exists
 * in the database, it will also include the existing data in the response. If the data is newly
 * created and saved in the database, it will include the newly created data in the response.
 */
const postMessages = async (req: Request, res: Response) => {
  const { username, userid, userimage, message, messageid } = req.body;
  const data = await MsgModel.findOne({ messageid: messageid });
  if (data) return res.status(200).json({ message: 'OK', data: data });

  const newMsg = new MsgModel({
    username: username,
    userid: userid,
    userimage: userimage,
    message: message,
    messageid: messageid,
  });

  await newMsg.save();
  return res.status(200).json({ message: 'OK', data: newMsg });
};

export { getStatus, getAllUsers, getBans, postMessages };
