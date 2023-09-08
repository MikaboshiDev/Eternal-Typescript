import model from '../../src/models/products';
import { Request, Response } from 'express';

const getProducts = async (req: Request, res: Response) => {
   const data = await model.find();
   if (!data) return res.status(404).json({ message: 'NOT_FOUND' });
   if (data.length === 0) return res.status(404).json({ message: 'NOT_FOUND' });

   return res.status(200).json({ data });
};

const getProduct = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = await model.findOne({ id });
   if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

   return res.status(200).json({ data });
};

const addProduct = async (req: Request, res: Response) => {
   const { name, id, price, description, image, category, quantity, date } =
      req.body;
   const data = await model.findOne({ id });
   if (data) return res.status(409).json({ message: 'CONFLICT' });

   const modelCreate = new model({
      name: name,
      id: id,
      price: price,
      description: description,
      image: image,
      category: category,
      quantity: quantity,
      date: date,
   });

   const save = await modelCreate.save();
   if (!save) return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
   return res.status(200).json({
      message: 'OK',
      data: save,
   });
};

const editProduct = async (req: Request, res: Response) => {
   const { name, price, description, image, category, quantity, date } =
      req.body;
   const { id } = req.params;

   const data = await model.findOne({ id });
   if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

   await model.findOneAndUpdate(
      { id },
      {
         name: name,
         price: price,
         description: description,
         image: image,
         category: category,
         quantity: quantity,
         date: date,
      }
   );

   return res.status(200).json({
      message: 'OK',
      data: data,
   });
};

const deleteProduct = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = await model.findOne({ id });
   if (!data) return res.status(404).json({ message: 'NOT_FOUND' });

   await model.findOneAndDelete({ id });
   return res.status(200).json({ message: 'OK' });
};

const recomendProduct = async (req: Request, res: Response) => {
   const { name, price, description, image, category, quantity, date } =
      req.body;
   return res.status(200).json({ message: 'OK' });
};

export {
   getProducts,
   getProduct,
   addProduct,
   editProduct,
   deleteProduct,
   recomendProduct,
};
