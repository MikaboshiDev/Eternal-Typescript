import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  GuildID: String,
  MembersID: [String],
  TicketID: String,
  ChannelID: String,
  Closed: Boolean,
  CreatedBy: String,
  Opened: String,
  Support: String,
});
const UserModel = model('Ticket-System', UserSchema);
export default UserModel;
