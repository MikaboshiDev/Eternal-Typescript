import { logWithLabel } from '../../../utils/console';
import MsgModel from '../../../models/messages';
import { Event } from '../../../class/builders';

export default new Event('messageCreate', async (message) => {
   if (message.author.bot || !message.guild || !message.channel) return;
   if (message.channel.id !== process.env.channel_web) return;
   if (message.content.length < 1) return;
   if (message.content.length > 40) return;

   const msg = await MsgModel.findOne({ messageId: message.id });
   if (msg)
      return logWithLabel('info', 'Message already exists in the database');

   let content = message.content;
   function containsLink(text: string) {
      const urlPattern = /(https?:\/\/[^\s]+)/;
      return urlPattern.test(text);
   }

   if (containsLink(content)) {
      content = 'Mensaje Bloqueado';
   }

   if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      if (attachment) content += attachment.url;
   }

   const data = await MsgModel.findOne({ messageid: message.id });
   if (data)
      return logWithLabel(
         'info',
         `Message already exists in the database the second time ${message.id}`
      );
   const msgModel = new MsgModel({
      username: message.author.username,
      userid: message.author.id,
      userimage: message.author.displayAvatarURL({
         forceStatic: true,
         extension: 'png',
      }),
      message: content,
      messageid: message.id,
   });

   msgModel
      .save()
      .then(() => {
         logWithLabel(
            'info',
            'Message saved to the database in the day ' +
               new Date().toLocaleDateString()
         );
      })
      .catch((err) => {
         logWithLabel('error', `Error saving message to the database: ${err}`);
      });
});
