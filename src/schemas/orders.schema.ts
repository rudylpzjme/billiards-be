import { Schema, model } from "mongoose";
import { Order } from "../models/order.model";

const cartSchema = new Schema({
  line_items: [{
    _id: false,
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    }
  }],
  total: {
    type: Number,
    required: true,
  }
})

export const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  cart: {
    type: cartSchema,
    required: false,
    unique: false,
  },
})

const orders = model<Order & Document>('Order', orderSchema);

export default orders;
