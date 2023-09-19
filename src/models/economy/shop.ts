import { Schema, model } from 'mongoose';

const models = new Schema({
   _id: Schema.Types.ObjectId,
   guildId: String,

   itemName: String,
   itemDescription: String,
   itemPrice: String,
   itemIdentifier: String, 

   role: String,
   money: Number,
});

export default model('shopModel', models);
