import { Message } from 'discord.js';

module.exports = {
  name: 'dinochorome',
  description: 'See the chrome dino playing inside the server',
  aliases: ['dino-chrome', 'chorome-dino'],
  category: 'fun',
  premium: false,
  cooldown: 20,
  async execute(client: any, message: Message, args: string[], prefix: any) {
    let msg = await message.channel.send({ content: `---------------🦖` });
    let time = 1 * 1000;
    setTimeout(function () {
      msg.edit(`-----------🦖----`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----------🦖------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`--------🦖--------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`------🦖-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-------🦖-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🌵-----🦖---------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🌵-🦖-------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🦖\n ---🌵--------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`------🦖---🌵--------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----🦖-----🌵----------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-🌵🌵-----🦖-------🌵--------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`----🌵🌵-🦖----------🌵------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🦖\n ---🌵🌵-------------🌵---`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-----🦖---🌵🌵-------------🌵--`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`-------🦖-----🌵🌵-------------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`🎂----🦖--------🌵🌵-----------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`---🎂--🦖----------🌵🌵---------`);
    }, time);
    time += 1.5 * 1000;

    setTimeout(function () {
      msg.edit(`**Ⓜⓘⓢⓢⓘⓞⓝ Ⓒⓞⓜⓟⓛⓔⓣⓔⓓ !**\n ---🎂🦖----------🌵🌵-------------`);
    }, time);
  },
};
