import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  guildId: String,
  channelUser: { type: Array, default: [] }
});
const UserModel = model('Channel-Status', UserSchema);
export default UserModel;
