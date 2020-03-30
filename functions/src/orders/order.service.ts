import { Product } from "../models/product";
import { OrderRepository } from "./order.repository";

export class OrderService {
  
  constructor(private orderRepository: OrderRepository) {}

  updateOrderlinesWithProductId(orderId: string): Promise<any> {
    return this.orderRepository.updateOrderlinesWithProductId(orderId);
  }

  updateOrderlinesProduct(productBefore: Product, productAfter: Product): Promise<any> {
    this.emptyProductNameException(productBefore);
    this.emptyProductNameException(productAfter);
    return this.orderRepository.updateOrderlinesProduct(productBefore, productAfter);
  }

  emptyProductNameException(product: Product) {
    if (product.name === "") {
      throw new SyntaxError('ProductName cannot be empty');
    }
  }
}