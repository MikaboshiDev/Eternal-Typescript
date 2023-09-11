import { logWithLabel } from '../utils/console';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: '',
      pass: "",
   },
});

const enviarCorreo = (
   destinatario: string,
   asunto: string,
   mensaje: string
) => {
   const opcionesCorreo = {
      from: '',
      to: destinatario,
      subject: asunto,
      text: mensaje,
   };

   transporter.sendMail(opcionesCorreo, (error: any, info: { response: any; }) => {
        if (error) logWithLabel("error", `Error in the email: ${error}`);
        else logWithLabel("success", `Email sent: ${info.response}`);
   });
};

export { enviarCorreo }

