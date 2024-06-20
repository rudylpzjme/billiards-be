import { NextFunction, Request, Response } from "express";
import OrderService from "../services/orders.service";
import { Cart, Order } from "../models/order.model";
import ProductService from "../services/products.service";

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
      res.status(200).json({
        message: "OK"
      });
    } catch (error) {
      next(error);
    }
  }

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const cart = {
          line_items: req.body.cart.lineItems,
          total: req.body.cart.total,
      } as Cart;

      await this.ordersService.updateOrder(id, cart);
      res.status(200).json({
        message: "OK"
      });
    } catch (error) {
      next(error);
    }
  }

  public payOrder = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const productsService = new ProductService();

    try {
      await this.ordersService.payOrder(id, req.body.status);
      res.status(200).json({
        message: "OK"
      });
      const order = await this.ordersService.getOrder(id);
      order?.cart.line_items.forEach((item: any) => {
        const {id, quantity} = item;
        console.log(`Item: ${item}`);
        console.log(`ID: ${id} QTY: ${quantity}`);
        productsService.decrease(id, quantity);
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
