import { logWithLabel } from '../utils/console';
import config from "../../config/gmail.json";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure: false,
   auth: {
      user: 'sn4083495@gmail.com', //config[1].gmail
      pass: 'hbxssyaaqjtencvi', //config[1].password
   },
});

transporter.verify((error: any, success: any) => {
   if (error) logWithLabel('error', `Error in the email: ${error}`);
   else logWithLabel('success', `Server is ready to take our messages: ${success}`);
});

const enviarCorreo = (
   destinatario: string,
   asunto: string,
   mensaje: string
) => {
   const opcionesCorreo = {
      from: 'sn4083495@gmail.com', //config[1].gmail
      to: destinatario,
      subject: asunto,
      text: mensaje,
   };

   transporter.sendMail( opcionesCorreo, (error: any, info: { response: any }) => {
         if (error) logWithLabel('error', `Error in the email: ${error}`);
         else logWithLabel('success', `Email sent: ${info.response}`);
      }
   );
};

export { enviarCorreo };
