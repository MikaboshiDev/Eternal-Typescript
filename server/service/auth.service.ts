import { encrypt, verified } from '../../src/utils/bcrypt';
import { signToken } from '../../src/utils/jwt_token';
import { Auth } from '../interface/auth.interface';
import { User } from '../interface/user.interface';
import UserModel from '../../src/models/auth';

/**
 * The function `registerNewUser` checks if a user with the given email already exists, encrypts the
 * password, and creates a new user if all checks pass.
 * @param {User}  - - `email`: The email of the user to be registered.
 * @returns The function `registerNewUser` returns either 'USER_ALREADY_EXIST' if a user with the same
 * email already exists, 'ERR_ENCRYPT_PASSWORD' if there was an error encrypting the password, or the
 * newly created user object if the registration is successful.
 */
const registerNewUser = async ({ email, password, name }: User) => {
  const checkIs = await UserModel.findOne({ email: email });
  if (checkIs) return 'USER_ALREADY_EXIST';

  const passHash = await encrypt(password);
  if (!passHash) return 'ERR_ENCRYPT_PASSWORD';
  const registerNewUser = await UserModel.create({
    email: email,
    password: passHash,
    name: name,
  });
  return registerNewUser;
};

/**
 * The function loginUser is an asynchronous function that takes in an object with email and password
 * properties, checks if the email exists in the UserModel, verifies the password, and returns a token
 * and user data if successful.
 * @param {Auth}  - - `email`: The email of the user trying to log in.
 * @returns either the string 'DATE_INCORRECT' if the user with the provided email does not exist,
 * 'PASSWORD_INCORRECT' if the provided password does not match the stored password hash, or an object
 * containing a token and the user data if the email and password are correct.
 */
const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return 'DATE_INCORRECT';

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return 'PASSWORD_INCORRECT';

  const token = signToken(checkIs.email);
  const data = { token, user: checkIs };
  return data;
};

/**
 * The function `Authdelete` deletes a user from the database based on their email and password.
 * @param {Auth}  - - `email`: The email of the user to be deleted.
 * @returns The function `Authdelete` returns a string value. If the `checkUser` is falsy (null,
 * undefined, false, 0, etc.), it returns the string `'USER_NOT_EXIST'`. Otherwise, it deletes the user
 * from the UserModel collection based on the provided email and password, and returns the string
 * `'DELETE_USER_AUTH'`.
 */
const Authdelete = async ({ email, password }: Auth) => {
  const checkUser = await UserModel.findOne({
    password: password,
    email: email,
  });
  if (!checkUser) return 'USER_NOT_EXIST';

  await UserModel.findOneAndDelete({ password: password, email: email });
  return 'DELETE_USER_AUTH';
};

export { loginUser, registerNewUser, Authdelete };
