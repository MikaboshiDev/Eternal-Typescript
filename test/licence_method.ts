import { logWithLabel } from '../src/utils/console';
import package_from from '../package.json';
import axios from 'axios';

let status_code;
const URL = `http://192.192-39.21:2556/api/client`;
const API_KEY = 'DDkPTP8vbarqezj7q7D8jOHXMjZzB654zu1wc3oYNbwFYOOXZVL';

const licence_auth = async () => {
  const res = await axios.post(
    URL,
    {
      license: 'licence',
      product: package_from.name,
      version: package_from.version,
    },
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (res.data?.status_overview !== 'success' && res.data?.status_code !== 200) {
    logWithLabel('error', `the error method licence invalid`); 
    status_code = false;
  } else if (res.data?.status_overview === 'success' && res.data?.status_code === 200) {
    logWithLabel('success', `accept licence auth dashboard`);
    status_code = true;
  } else {
    logWithLabel('error', `the error method licence invalid`); 
    status_code = false;
  }
};
