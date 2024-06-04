import { Product } from '../models/products.model';
import productsModel from '../schemas/products.schema';

class ProductService {
  public products = productsModel;

  public async findAll(): Promise<Product[]> {
    const products = await this.products.find();
    return products;
  }

  public async decrease(id: string, qtyToDecrease: Number) {
    await this.products.findByIdAndUpdate(id, {
      $inc: { quantity: -qtyToDecrease }
    })
  }
}

export default ProductService;
