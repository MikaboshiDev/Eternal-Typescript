import { Schema, Types, model, Model } from 'mongoose';

const StorageSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  rol: { type: String, default: 'user' },
  money: { type: Number, default: 1000 },
  bank: { type: Number, default: 100 },
  salary: { type: Number, default: 300 },
  games: { type: Number, default: 0 },
  messages: { type: Number, default: 0 },
  premium: { type: Boolean, default: false },
  partner: { type: Boolean, default: false },
  retired: { type: Boolean, default: false },
  modmail: { type: Boolean, default: false },
  daily: String,
  work: String,
  crime: String,
  explore: String,
  rob: String,
  job: String,
  store: {
    inventory: { type: Array, default: [] }
  },
});

const StorageModel = model('UsersEconomy-Model', StorageSchema);
export default StorageModel;
