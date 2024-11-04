import { Product } from "./products.model";

export interface Cart {
  line_items: Product [],
  total: number,
}

export interface Order {
  _id?: string,
  name: string,
  date: Date,
  status: string,
  cart: Cart,
}
