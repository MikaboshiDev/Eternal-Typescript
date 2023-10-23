import { Schema, Types, model, Model } from 'mongoose';

const StorageSchema = new Schema({
  username: String,
  userid: Number,
  premium: { type: Boolean, default: false },
  warnings: { type: Array, default: [] },
  sancions: { type: Array, default: [] },
});

const StorageModel = model('Users-Model', StorageSchema);
export default StorageModel;
