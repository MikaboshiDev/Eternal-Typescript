interface IProduct extends Document {
  name: string;
  id: number;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  date: Date;
}

export default IProduct;
