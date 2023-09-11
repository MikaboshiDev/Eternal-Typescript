import { Schema, Types, model, Model } from 'mongoose';
const product = new Schema({
    username: { type: String, required: true },
    userid: { type: String, required: true },
    userimage: { type: String, required: true },
    message: { type: String, required: true },
    messageid: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const ProductModel = model('Messages', product);
export default ProductModel;
