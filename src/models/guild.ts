import mongoose from 'mongoose';

const model = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  prefix: { type: String, default: '!' },
  lenguages: { type: Array, default: ['en'] },
  channel_updates: { type: String, default: '' },
  channel_log: { type: String, default: '' },
});

export default mongoose.model('guild', model);
