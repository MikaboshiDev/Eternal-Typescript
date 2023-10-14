import { Schema, Types, model, Model } from 'mongoose';
const UserSchema = new Schema({
  GuildID: String,
  ChannelID: String,
  MessageID: String,
  MemberID: String,
  MemberTag: String,
  Suggestion: String,
  Accepted: Boolean,
  Declined: Boolean,
  Upvotes: [String],
  Downvotes: [String],
});
const UserModel = model('Quest', UserSchema);
export default UserModel;