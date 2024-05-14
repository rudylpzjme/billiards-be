import { Router } from "express";
import { Routes } from "../interfaces/routes.interfaces";
import OrderController from "../controllers/orders.controller";

class OrderRoutes implements Routes {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrderController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ordersController.getOrders);
    this.router.post(`${this.path}`, this.ordersController.createOrder);
    this.router.patch(`${this.path}/:id`, this.ordersController.updateOrder);
  }
}

export default OrderRoutes;
