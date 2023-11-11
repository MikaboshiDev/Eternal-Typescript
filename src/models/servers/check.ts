import { model, Schema, Document } from 'mongoose';
const CaptchaCodeSchema = new Schema({
  Id: String,
  Code: String,
});

const CaptchaCodeModel = model('codes-capcha', CaptchaCodeSchema);
export default CaptchaCodeModel;
