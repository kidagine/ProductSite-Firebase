import { Product } from "../models/product";
import { Stock } from "../models/stock";

export interface ProductRepository {

  addProductToStock(productId: string, product: Product): Stock;

}