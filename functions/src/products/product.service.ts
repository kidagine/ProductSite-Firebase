import { ProductRepository } from "./product.repository";
import { Product } from "../models/product";
import { Stock } from "../models/stock";

export class ProductService {

  constructor(private productRepository: ProductRepository) {}

  addProductToStock(productId: string, product: Product): Promise<any> {
    const stock: Stock = this.createStock(product);
    return this.productRepository.addProductToStock(productId, stock);
  }

  buyProduct(orderId: string): Promise<any> {
    return this.productRepository.buyProduct(orderId);
  }

  createStock(product: Product): Stock {
    const stockDocument: Stock = {
      productName: product.name,
      stockCount: 5
    }
    return stockDocument;
  }

}