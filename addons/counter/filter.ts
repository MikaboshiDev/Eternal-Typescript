import math, { evaluate } from 'mathjs';
import guildDatas from '../../src/models/counter/guild';
import userDatas from '../../src/models/counter/user';

/**
 *@param {guildDatas} guildData
 *@param {userDatas} userData
 */
export function filterContent(
  message: { content: string; author: { id: any } },
  guildData: { math: boolean; lastUser: any; saves: number; score: number },
  userData: { saves: number }
) {
  const messageContent = message.content.toLowerCase();
  let output = 'seven';

  const alphabet =
    `a` ||
    `b` ||
    `c` ||
    `d` ||
    `e` ||
    `f` ||
    `g` ||
    `h` ||
    `i` ||
    `j` ||
    `k` ||
    `l` ||
    `m` ||
    `n` ||
    `o` ||
    `p` ||
    `q` ||
    `r` ||
    `s` ||
    `t` ||
    `u` ||
    `v` ||
    `w` ||
    `x` ||
    `y` ||
    `z`;

  if (messageContent.includes(alphabet)) {
    output = 'one';
    return output;
  } else {
    if (guildData.math == false) {
      const mathCal = evaluate(`${messageContent}`);
      const number = parseInt(mathCal);

      if (isNaN(number)) {
        output = 'one';
        return output;
      } else if (message.author.id == guildData.lastUser && userData.saves !== 0) {
        output = 'two';
        return output;
      } else if (message.author.id == guildData.lastUser && guildData.saves !== 0) {
        output = 'three';
        return output;
      } else if (message.author.id == guildData.lastUser) {
        output = 'four';
        return output;
      } else if (guildData.score == 0 && number !== guildData.score + 1) {
        output = 'five';
        return output;
      } else if (number !== guildData.score + 1 && userData.saves !== 0) {
        output = 'two';
        return output;
      } else if (number !== guildData.score + 1 && guildData.saves !== 0) {
        output = 'three';
        return output;
      } else if (number !== guildData.score + 1) {
        output = 'six';
        return output;
      } else {
        output = 'seven';
        return output;
      }
    } else {
      const number = parseInt(messageContent);
      if (isNaN(number)) {
        output = 'one';
        return output;
      } else if (message.author.id == guildData.lastUser && userData.saves !== 0) {
        output = 'two';
        return output;
      } else if (message.author.id == guildData.lastUser && guildData.saves !== 0) {
        output = 'three';
        return output;
      } else if (message.author.id == guildData.lastUser) {
        output = 'four';
        return output;
      } else if (guildData.score == 0 && number !== guildData.score + 1) {
        output = 'five';
        return output;
      } else if (number !== guildData.score + 1 && userData.saves !== 0) {
        output = 'two';
        return output;
      } else if (number !== guildData.score + 1 && guildData.saves !== 0) {
        output = 'three';
        return output;
      } else if (number !== guildData.score + 1) {
        output = 'six';
        return output;
      } else {
        output = 'seven';
        return output;
      }
    }
  }
}
