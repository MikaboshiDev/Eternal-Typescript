import { Schema, model } from 'mongoose';
import { IProduct } from '../../global';
const product = new Schema<IProduct>({
  name: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

const ProductModel = model('Product', product);
export default ProductModel;
