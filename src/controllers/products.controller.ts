import { NextFunction, Request, Response } from "express";
import ProductService from "../services/products.service";
import { Product } from "../models/products.model";

class ProductController {
  public productsService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products: Product[] = await this.productsService.findAll();

      res.status(200).json({ data: products, message: 'findAll' })
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default ProductController;
