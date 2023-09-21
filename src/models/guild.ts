import mongoose from 'mongoose';

const model = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  prefix: { type: String, default: '!' },
  lenguages: { type: Array, default: ['en'] },
});

export default mongoose.model('guild', model);
