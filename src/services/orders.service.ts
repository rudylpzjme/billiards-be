import { Cart, Order } from '../models/order.model';
import orderModel from '../schemas/orders.schema';
import { isEmpty } from '../utils/utils';
import { endOfDay, startOfDay, format } from 'date-fns';

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
    try {
      console.log("DATE", date);
      console.log("INITIAL DATE", format(startOfDay(date), "yyyy-MM-dd'T'HH:mm:ss"));
      console.log("END DATE", format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ss"));

      const orders = await this.orders.find({
        date: {
          $gte: format(startOfDay(date), "yyyy-MM-dd'T'HH:mm:ss"),
          $lte: format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ss")
        }
      });

      return orders;
    } catch (error) {
      throw error;
    }
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
