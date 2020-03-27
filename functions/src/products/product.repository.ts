import { Stock } from "../models/stock";
import { Product } from "../models/product";

export interface ProductRepository {

  addProductToStock(productId: string, stock: Stock): Promise<any>;
  buyProduct(orderId: string): Promise<any>;
  renameProduct(productId: string, productBefore: Product, productAfter: Product): Promise<any>;
}