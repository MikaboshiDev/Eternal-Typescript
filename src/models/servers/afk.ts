import { Schema, Types, model, Model } from 'mongoose';

const StorageSchema = new Schema({
  UserID: String,
  Reason: String,
});

const StorageModel = model('UsersAFK-Model', StorageSchema);
export default StorageModel;