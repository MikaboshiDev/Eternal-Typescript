const Api_Url = 'https://discord.com/api/v10';
import axios from 'axios';

async function requestHandler(url: string, method: string, data: any) {
  const response = await axios({
    method: method,
    url: `${Api_Url}${url}`,
    headers: {
      Authorization: `Bot ${process.env.token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  });

  return response.data;
}

export { requestHandler }