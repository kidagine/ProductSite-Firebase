import { ProductRepository } from "./product.repository";
import { Product } from "../models/product";
import { Stock } from "../models/stock";

export class ProductService {

  constructor(private productRepository: ProductRepository) {}

  addProductToStock(productId: string, product: Product): Stock {
    return this.productRepository.addProductToStock(productId, product);
  }

}