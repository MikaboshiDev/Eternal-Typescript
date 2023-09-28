import mongoose from 'mongoose';

const keySchema = new mongoose.Schema({
  key: String,
  money: String,
  duration: String,
  activated: { type: Boolean, default: false },
});

export default mongoose.model('key', keySchema);
