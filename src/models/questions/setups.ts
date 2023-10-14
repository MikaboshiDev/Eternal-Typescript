import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  GuildID: String,
  SuggestChannel: String,
  ManagerRole: String,
  embedColor: String,
  AcceptColor: String,
  DeclineColor: String,
});
const UserModel = model('Quest-Setups', UserSchema);
export default UserModel;
