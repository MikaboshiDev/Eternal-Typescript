import { Request, Response } from 'express';
import { Authdelete, loginUser, registerNewUser } from '../service/auth.service';
import { enviarCorreo } from '../../src/structure/nodemailer';
import { apiError } from '../../src/utils/errors';
import model from '../../src/models/model';

/**
 * The function `registerCtrl` registers a new user and sends a response, as well as sends a
 * confirmation email to the user.
 * @param {Request}  - - `registerCtrl`: a function that handles the registration of a new user
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 */
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

/**
 * The loginCtrl function is an asynchronous function that handles a login request by extracting the
 * email and password from the request body, calling the loginUser function with the extracted data,
 * and sending the response back to the client.
 * @param {Request}  - - `body`: The request body object containing the email and password properties.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 */
const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const response = await loginUser({ email, password });
  res.send(response);
};

/**
 * The function `deleteAuths` is an asynchronous function that takes a request object and a response
 * object as parameters, extracts the email and password from the request body, calls the `Authdelete`
 * function with the extracted email and password, and sends the response received from `Authdelete`
 * back to the client.
 * @param {Request}  - - `body`: The request body object that contains the data sent in the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which provides methods for sending
 * the response, such as `send()`, `json()`, `status()`, etc. In this case,
 */
const deleteAuths = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const response = await Authdelete({ email, password });
  res.send(response);
};

/**
 * The function `getUser` retrieves a user from the database based on the provided user_id and returns
 * it as a JSON response.
 * @param {Request}  - - `getUser` is an asynchronous function that takes two parameters: `Request` and
 * `Response`.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which provides methods for setting
 * the status code and sending the response body.
 * @returns If the user is found in the database, the function will return a response with a status
 * code of 200 and the user data in JSON format. If the user is not found, the function will return a
 * response with a status code of 404 and a JSON object with a message indicating that the user was not
 * found in the database.
 */
const getUser = async ({ body }: Request, res: Response) => {
  try {
    const data = await model.findOne({ user_id: body.user_id });
    if (!data) return res.status(404).json({ message: 'User not found in database' });
    return res.status(200).json(data);
  } catch (error) {
    apiError(res, `Error in api rest: ${error}`);
  }
};

/**
 * The function `postUser` checks if a user exists in the database and creates a new user if they
 * don't.
 * @param {Request}  - - `postUser`: The name of the function that handles the POST request for
 * creating a user.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which provides methods for setting
 * the response status code, headers, and body.
 * @returns a JSON response with a message and code. If the user already exists in the database, the
 * message will be "User exist in database" and the code will be 200. If the user is successfully
 * created in the database, the message will be "User created in database" and the code will be 200.
 */
const postUser = async ({ body }: Request, res: Response) => {
  const data = await model.findOne({ user_id: body.user_id });
  if (data) return res.status(200).json({ message: 'User exist in database', code: 200 });
  const user = new model({
    username: body.username,
    user_id: body.user_id,
    email: body.email,
  });

  await user.save();
  return res.status(200).json({ message: 'User created in database', code: 200 });
};

/**
 * The authLogout function returns a JSON response with a message, alerts, and code indicating a failed
 * login in the API rest manager.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 */
const authLogout = async (req: Request, res: Response) => {
  res.status(404).json({
    message: 'The login failed in the api rest manager',
    alerts: 'please for in login api rest',
    code: 404,
  });
};

export { registerCtrl, loginCtrl, deleteAuths, getUser, postUser, authLogout };
