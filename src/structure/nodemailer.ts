import { logWithLabel } from '../utils/console';
import config from '../../config/gmail.json';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sn4083495@gmail.com', 
    pass: 'hbxssyaaqjtencvi', 
  },
});

/* The `transporter.verify()` function is used to verify the connection configuration of the email
server. It takes a callback function as an argument, which will be called once the verification is
complete. */
transporter.verify((error: any, success: any) => {
  if (error) logWithLabel('error', `Error in the email: ${error}`);
  else logWithLabel('success', `Server is ready to take our messages: ${success}`);
});

const enviarCorreo = (destinatario: string, asunto: string, mensaje: string) => {
  const opcionesCorreo = {
    from: 'sn4083495@gmail.com', 
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

/* The code `transporter.sendMail(opcionesCorreo, (error: any, info: { response: any }) => { ... })` is
sending an email using the `transporter` object created with nodemailer. */
  transporter.sendMail(opcionesCorreo, (error: any, info: { response: any }) => {
    if (error) logWithLabel('error', `Error in the email: ${error}`);
    else logWithLabel('success', `Email sent: ${info.response}`);
  });
};

export { enviarCorreo };
