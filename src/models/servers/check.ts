import { model, Schema, Document } from 'mongoose';
interface CaptchaCode extends Document {
  Id: string;
  Code: string;
}

const CaptchaCodeSchema = new Schema<CaptchaCode>({
  Id: String,
  Code: String,
});

const CaptchaCodeModel = model<CaptchaCode>('codes-capcha', CaptchaCodeSchema);
export default CaptchaCodeModel;
