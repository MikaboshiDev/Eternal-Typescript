import { Storage } from '../../server/interface/upload.interface';
import { Schema, Types, model, Model } from 'mongoose';

const StorageSchema = new Schema<Storage>(
   {
      fileName: { type: String },
      idUser: { type: String },
      path: { type: String },
   },
   {
      versionKey: false,
      timestamps: true,
   }
);

const StorageModel = model('storage', StorageSchema);
export default StorageModel;
