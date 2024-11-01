export interface Product {
  _id?: string,
  description: string,
  image: string,
  price: number,
  quantity: number,
  title: string,
  type: string,
}

export interface ItemCart {
  id: string,
  name: string,
  image: string,
  price: Number,
  quantity: Number,
}
