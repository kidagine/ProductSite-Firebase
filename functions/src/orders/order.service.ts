import { Product } from "../models/product";
import { OrderRepository } from "./order.repository";

export class OrderService {
  
  constructor(private orderRepository: OrderRepository) {}

  updateOrderlinesWithProductId(orderId: string): Promise<any> {
    return this.orderRepository.updateOrderlinesWithProductId(orderId);
  }

  updateOrderlinesProduct(productBefore: Product, productAfter: Product): Promise<any> {
    return this.orderRepository.updateOrderlinesProduct(productBefore, productAfter);
  }
}