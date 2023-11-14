import { Schema, model, Document } from 'mongoose';
const UserSchema = new Schema({
  guildId: { type: String, require: true },
  userId: { type: String, require: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
});
const UserModel = model('Schame-Lavel', UserSchema);
export default UserModel;
