import { Router } from "express";
import { Routes } from "../interfaces/routes.interfaces";
import ProductController from "../controllers/products.controller";

class ProductRoutes implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.post(`${this.path}`, this.productsController.createProduct);
    this.router.patch(`${this.path}/:id`, this.productsController.updateProduct);
    this.router.delete(`${this.path}/:id`, this.productsController.removeProduct);
  }
}

export default ProductRoutes;
