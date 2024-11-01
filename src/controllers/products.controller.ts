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
      const { description, image, price, quantity, title, type } = req.body;
      const response = await this.productsService.createProduct({
        description,
        image,
        price,
        quantity,
        title,
        type,
      });

      const newProduct = {
        id: response._id,
        description: response.description,
        image: response.image,
        price: response.price,
        quantity: response.quantity,
        title: response.title,
        type: response.type,
      }

      res.status(201).json({
        message: "OK",
        newProduct: newProduct,
      });
    } catch (error: unknown) {
      console.error(`[ERROR] - ${error}`);
    }
  }

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      });
    } catch (error) {
      console.error(`[ERROR] - ${error}`);
    }
  }

  public removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const deletedCount = await this.productsService.removeProduct(id);

      deletedCount > 0 ? res.status(200).json({
        id: id,
      }) : res.status(400);
    } catch (error) {
      
    }
  }
}

export default ProductController;
