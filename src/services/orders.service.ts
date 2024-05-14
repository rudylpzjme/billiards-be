import { Order } from '../models/order.model';
import orderModel from '../schemas/orders.schema';
import { isEmpty } from '../utils/utils';

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

  public async createOrder(orderData: Order): Promise<Order> {
    if (isEmpty(orderData)) throw new Error("orderData is empty");

    console.log("ORDER", orderData);
    const createUserData: Order = await this.orders.create({
      ...orderData,
    });

    return createUserData;
  }

  //findOneAndUpdate
}

export default OrdersService;
