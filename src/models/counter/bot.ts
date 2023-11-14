import { Schema, model, Document } from 'mongoose';
const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  cmdUsed: {
    type: Number,
    default: 1,
  },
  count: {
    right: {
      type: String,
      default: 0,
    },
    rong: {
      type: String,
      default: 0,
    },
  },
});
const UserModel = model('Bot-Counter', UserSchema);
export default UserModel;
