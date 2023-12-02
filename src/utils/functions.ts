import { EmbedBuilder, Message, User } from 'discord.js';
import emojis from '../../config/json/emojis.json';
import model from '../models/servers/economy';
const Api_Url = 'https://discord.com/api/v10';
import { logWithLabel } from './console';
import { config } from './config';
import get from 'superagent';
import axios from 'axios';

export async function economyData(client: any, message: Message, user: User) {
  try {
    const data = await model.findOne({ userID: user.id });
    if (!data) {
      const errorMessage = [
        `${emojis.error} Hello **${user.username}** I'm sorry, but you don't have an economy system in my database.`,
        `Please try again later or contact server support.`,
      ].join('\n');
      return sendErrorMessage(message, user, errorMessage);
    }

    if (data.money <= 0 || data.money === null || data.money === undefined) {
      const errorMessage = [
        `${emojis.error} Hello **${user.username}** I'm sorry, but you don't have much money outside of the bank.`,
        `I recommend you work or claim rewards to earn money and be able to play.`,
      ].join('\n');
      return sendErrorMessage(message, user, errorMessage);
    }
  } catch (error) {
    console.error('Error while fetching economy data:', error);
    const errorMessage = 'An error occurred while fetching economy data. Please try again later.';
    return sendErrorMessage(message, user, errorMessage);
  }
}

function sendErrorMessage(message: any, user: any, description: any) {
  return message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: `Server economy error`, iconURL: user.avatarURL({ forceStatic: true }) })
        .setFooter({ text: `Server economy error`, iconURL: user.avatarURL({ forceStatic: true }) })
        .setDescription(description)
        .setColor('Red')
        .setTimestamp(),
    ],
  });
}

async function requestHandler(url: string, method: string, data: any) {
  const response = await axios({
    method: method,
    url: `${Api_Url}${url}`,
    headers: {
      Authorization: `Bot ${config.general.token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  });

  return response.data;
}

async function animeApi(action: any) {
  try {
    const { body } = await get(`https://api.waifu.pics/sfw/${action}`);
    return body.url;
  } catch (err) {
    logWithLabel('error', `Error in animeApi: ${err}`);
  }
}

export async function validCode(message: Message<boolean>) {
  try {
    const codeBlocks = [
      '```js',
      '```c',
      '```cs',
      '```css',
      '```cpp',
      '```fix',
      '```diff',
      '```html',
      '```yml',
      '```java',
      '```python',
      '```rb',
      '```hs',
      '```haskell',
      '```bash',
      '```ruby',
      '```lua',
      '```py',
    ];

    const hasCodeBlock = codeBlocks.some((codeBlock) => message.content.includes(codeBlock));
    const codeBlockCount = message.content.replace(/[^`]/g, '').length;
    if (hasCodeBlock && codeBlockCount > 2) {
      message.react('🤖').catch(() => {});
    }
  } catch (error) {
    logWithLabel('error', `Error in validCode: ${error}`);
  }
}

export { animeApi, requestHandler };