import { NextFunction, Request, Response } from "express";
import OrderService from "../services/orders.service";
import { Order } from "../models/order.model";

class OrderController {
  public ordersService = new OrderService();

  public getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: Order[] = await this.ordersService.findAll();

      res.status(200).json({ data: orders, message: 'findAll' })
    } catch (error: unknown) {
      next(error);
    }
  }

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    // use Response object to send a good response to the frontend
    try {
      const order = {
        name: req.body.name,
        date: req.body.date,
        status: req.body.status,
        cart: {
          line_items: req.body.cart.lineItems,
          total: req.body.cart.total,
        }
      } as Order;

      await this.ordersService.createOrder(order);
    } catch (error) {
      next(error);
    }
  }

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    

  }
}

export default OrderController;
