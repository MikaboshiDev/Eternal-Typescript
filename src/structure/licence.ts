import { logWithLabel } from '../utils/console';
import _package from '../../package.json';
import { config } from '../utils/config';
import axios from 'axios';

export const checkLicense = async (license: string, product: string, version: string) => {
  const API_KEY = 'DDkPTP8vbarqezj7q7D8jOHXMjZzB654zu1wc3oYNbwFYOOXZVL';
  const URL = 'http://78.108.218.63:25507/api/client'; //78.108.218.63:25507
  let status;
  const res = await axios
    .post(
      URL,
      {
        license,
        product,
        version,
      },
      { headers: { Authorization: API_KEY } }
    )
    .catch((e) => e);

  if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
    status = false;
  } else if (res.data?.status_overview === 'success' && res.data?.status_code === 200) {
    status = true;
  } else {
    status = false;
  }

  return status;
};
