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

    await this.products.create({...productData})
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
      // const { description, image, price, quantity, title, type } = productData;
      console.log("PRODUCT DATA", productData);
      console.log("PRODUCT DATA", id);
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
}

export default ProductService;
