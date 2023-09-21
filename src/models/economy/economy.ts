import { Schema, model } from 'mongoose';

const models = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  currencyName: String,
  currencyEmoji: String,
  currencyPerMsg: String,
});

export default model('economyModel', models);
