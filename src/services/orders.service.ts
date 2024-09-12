import { Cart, Order } from '../models/order.model';
import orderModel from '../schemas/orders.schema';
import { isEmpty } from '../utils/utils';
import { endOfDay, startOfDay } from 'date-fns';
import { toZonedTime } from "date-fns-tz";

class OrdersService {
  public orders = orderModel;

  public async findAll(): Promise<Order[]> {
    // add try catch
    const orders = await this.orders.find();
    return orders;
  }

  public async getOrder(orderId: string): Promise<Order | null> {
    // add try catch
    const order = await this.orders.findById(orderId);
    return order;
  }

  public async getOrdersByDate(date: Date): Promise<Order[]> {
    // add try catch
    const orders = await this.orders.find({
      date: {
        $gte: startOfDay(toZonedTime(date, "America/Mexico_City")),
        $lte: endOfDay(toZonedTime(date, "America/Mexico_City")),
      }
    });
    return orders;
  }

  public async getOrdersByStatus(status: string): Promise<Order[]> {
    // add try catch
    const orders = await this.orders.find({
      status: status,
    });
    return orders;
  }

  public async createOrder(orderData: Order): Promise<Order> {
    if (isEmpty(orderData)) throw new Error("orderData is empty");

    const createdOrder: Order = await this.orders.create({
      ...orderData,
    });

    return createdOrder;
  }

  public async updateOrder(id: string, cart: Cart): Promise<Order | null> {
    if (isEmpty(cart)) throw new Error("cart data is empty");

    const updatedOrder: Order | null = await this.orders.findOneAndUpdate({
      _id: id,
    }, {
      cart,
    });

    return updatedOrder;
  }

  public async payOrder(id: string, status: string): Promise<Order | null> {
    if (!status) throw new Error("status is empty");

    const updatedOrder: Order | null = await this.orders.findOneAndUpdate({
      _id: id,
    }, {
      status: status,
    });

    return updatedOrder;
  }
}

export default OrdersService;
