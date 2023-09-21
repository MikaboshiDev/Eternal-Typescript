import { Schema, model } from 'mongoose';

const models = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,

  itemIdentifier: String,
  itemName: String,
  itemDescription: String,
  itemPrice: String,
  role: String,
  money: Number,
});

export default model('inventoryModel', models);
