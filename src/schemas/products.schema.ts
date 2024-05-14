import { Schema, model } from "mongoose";
import { Product } from "../models/products.model";

export const productsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
})

const products = model<Product & Document>('Product', productsSchema);

export default products;
