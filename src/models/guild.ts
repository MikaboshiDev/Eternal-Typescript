import mongoose from 'mongoose';

const model = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  premium: { type: Boolean, default: false },
  roleMember: { type: String, default: null },
  prefix: { type: String, default: '!' },
  commands: {
    components: { type: Boolean, default: false },
    slash: { type: Boolean, default: true },
  },
  lenguages: { type: Array, default: ['en'] },
  channels: {
    log: {
      enabled: { type: Boolean, default: false },
      channel: { type: String, default: null },
    },
    updates: {
      enabled: { type: Boolean, default: false },
      channel: { type: String, default: null },
    },
    chatbot: {
      enabled: { type: Boolean, default: false },
      channel: { type: String, default: null },
    },
  },
});

export default mongoose.model('guild', model);
