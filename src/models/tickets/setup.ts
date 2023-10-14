import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  GuildID: String,
  ChannelID: String,
  Category: String,
  Transcripts: String,
  Handlers: String,
  IDs: Number,
});
const UserModel = model('Ticket-Setup', UserSchema);
export default UserModel;
