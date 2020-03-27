import { Product } from "../models/product";
import { Stock } from "../models/stock";

export interface StockRepository {

  createStockWithProductId(productId: string, stock: Stock): Promise<any>;
  subtractStockFromOrderlines(): Promise<any>;
  updateOrderProduct(productId: string, productAfter: Product): Promise<any>;
}