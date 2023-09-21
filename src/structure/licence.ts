import { name, version } from '../../package.json';
import {} from 'discord.js';
import axios from 'axios';
import { logWithLabel } from '../utils/console';

const API_KEY = 'DDkPTP8vbarqezj7q7D8jOHXMjZzB654zu1wc3oYNbwFYOOXZVL';
const URL = 'http://104.128.49.50:25510/api/client';
let DATA;

/**
 * The function `postLicence` sends a POST request to a specified URL with a licence, product, and
 * version, and returns whether the licence is valid or not.
 * @param {string} licence - The `licence` parameter is a string that represents a license key or code.
 * @returns the value of the variable `DATA`.
 */
const postLicence = async (licence: string) => {
  const res = await axios.post(
    URL,
    {
      licence: licence,
      product: name,
      version: version,
    },
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
    logWithLabel('licence', `Licence ${licence} is invalid or expired!`);
    DATA = false;
  } else if (res.data?.status_overview === 'success' && res.data?.status_code === 200) {
    logWithLabel('licence', `Licence ${licence} is valid!`);
    DATA = true;
  } else {
    logWithLabel('licence', 'An error occured while checking licence!');
    DATA = false;
  }

  return DATA;
};

export { postLicence };
