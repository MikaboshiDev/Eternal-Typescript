import mongoose from 'mongoose';

const model = new mongoose.Schema({
  id: { type: String, unique: true },
  username: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  supportServer: { type: String, default: '' },
  prefix: { type: String, default: '' },
  website: { type: String, default: '' },
});

export default mongoose.model('clientBots', model);
