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
