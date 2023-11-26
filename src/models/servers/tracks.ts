import { Schema, model } from 'mongoose';

const trackSchema = new Schema({
  guildID: String,
  autoPlay: {
    type: Boolean,
    default: false,
  },
  messageID: String,
});

export = model('tracks', trackSchema);
