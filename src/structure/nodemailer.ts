/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://docs.night-support.xyz/
# Dashboard: http://www.night-support.xyz/

# Created by: MikaboshiDev
# Version: 0.0.2
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/

import { logWithLabel } from '../utils/console';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: '',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
});

transporter.verify((error: any, success: any) => {
  if (error) logWithLabel('error', `Error in the email: ${error}`);
  else logWithLabel('success', `Server is ready to take our messages: ${success}`);
});

const enviarCorreo = (destinatario: string, asunto: string, mensaje: string) => {
  const opcionesCorreo = {
    from: '',
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  transporter.sendMail(opcionesCorreo, (error: any, info: { response: any }) => {
    if (error) logWithLabel('error', `Error in the email: ${error}`);
    else logWithLabel('success', `Email sent: ${info.response}`);
  });
};

export { enviarCorreo };
