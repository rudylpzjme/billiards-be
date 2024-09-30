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

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // logic to create new product
    } catch (error: unknown) {

    }
  }

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // create a script to update a local file to a server
      const id = req.params.id;
      const { description, price, quantity, title, type } = req.body;
      const updatedProduct = await this.productsService.updateProduct(
        id,
        {
          description,
          price,
          quantity,
          title,
          type,
        }
      );

      res.status(200).json({
        message: "OK",
        updatedProduct: updatedProduct
      })
    } catch (error) {
      console.error(`[ERROR] - ${error}`);
    }
  }
}

export default ProductController;
