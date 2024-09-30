import { NextFunction, Request, Response } from "express";
import OrderService from "../services/orders.service";
import { Cart, Order } from "../models/order.model";
import ProductService from "../services/products.service";

class OrderController {
  private ordersService = new OrderService();
  private productsService = new ProductService();

  public getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: Order[] = await this.ordersService.findAll();

      res.status(200).json({ data: orders, message: 'findAll' })
    } catch (error: unknown) {
      next(error);
    }
  }

  public getOrdersByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const date = new Date(req.params.date);
      const orders: Order[] = await this.ordersService.getOrdersByDate(date);

      res.status(200).json({ data: orders, message: 'getOrderByDate' })
    } catch (error: unknown) {
      next(error);
    }
  }

  public getOrdersByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.params.status;
      console.log("STATUS", status)
      const orders: Order[] = await this.ordersService.getOrdersByStatus(status);

      res.status(200).json({ data: orders, message: 'getOrderByStatus' })
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

      order.cart.line_items.forEach((item: any) => {
        const {id, quantity} = item;
        this.productsService.decrease(id, quantity);
      });

      res.status(200).json({
        message: "OK"
      });
    } catch (error) {
      next(error);
    }
  }

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      // get the order and restore the products qty to previous state
      const order = await this.ordersService.getOrder(id);
      order?.cart.line_items.forEach((item: any) => {
        const {id, quantity} = item;
        this.productsService.increase(id, quantity);
      });

      const cart = {
          line_items: req.body.cart.lineItems,
          total: req.body.cart.total,
      } as Cart;

      // update products qty to last state
      cart.line_items.forEach((item: any) => {
        const {id, quantity} = item;
        this.productsService.decrease(id, quantity);
      });

      await this.ordersService.updateOrder(id, cart);
      res.status(200).json({
        message: "OK"
      });
    } catch (error) {
      next(error);
    }
  }

  public payOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.ordersService.payOrder(id, req.body.status);
      res.status(200).json({
        message: "OK"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
