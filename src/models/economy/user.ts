import { Schema, model } from 'mongoose';

const models = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  balance: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
});

export default model('userModel', models);
