import { Product } from '../models/products.model';
import productsModel from '../schemas/products.schema';
import { isEmpty } from '../utils/utils';

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

  public async increase(id: string, qtyToIncrease: Number) {
    await this.products.findByIdAndUpdate(id, {
      $inc: { quantity: qtyToIncrease }
    })
  }

  public async createProduct(productData: Product) {
    if (isEmpty(productData)) {
      throw new Error("Product data is empty");
    }

    const product = await this.products.create({...productData});
    return product;
  }

  public async updateProduct(
    id: string,
    productData: {
      description?: string,
      image?: string,
      price?: number,
      quantity?: number,
      title?: string,
      type?: string,
    }
  ) {
    try {
      const updatedProduct = await this.products.findOneAndUpdate({
        _id: id,
      }, {
        ...productData,
      });

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  public async removeProduct(id: string) {
    try {
      const response = await this.products.deleteOne({ _id: id });

      return response.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
