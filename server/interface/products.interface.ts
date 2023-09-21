interface IProduct extends Document {
  name: string;
  id: number;
  price: number;
  decription: string;
  image: string;
  category: string;
  quantity: number;
  date: Date;
}

export default IProduct;
