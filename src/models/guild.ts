import mongoose from 'mongoose';

const model = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
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
