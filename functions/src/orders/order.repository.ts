import { Product } from "../models/product";

export interface OrderRepository {

  updateOrderlinesWithProductId(orderId: string): Promise<any>;
  updateOrderlinesProduct(productBefore: Product, productAfter: Product): Promise<any>;
}