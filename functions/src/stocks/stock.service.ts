import { Product } from "../models/product";
import { Stock } from "../models/stock";
import { StockRepository } from "./stock.repository";

export class StockService {

  constructor(private stockRepository: StockRepository) {}

  createStock(productId: string, product: Product): Promise<any> {
    const stock: Stock = this.createStockDocument(product);
    return this.stockRepository.createStockWithProductId(productId, stock);
  }

  createStockDocument(product: Product): Stock {
    const stockDocument: Stock = {
      productName: product.name,
      stockCount: 5
    }
    return stockDocument;
  }

  subtractStockFromOrderlines(): Promise<any> {
    return this.stockRepository.subtractStockFromOrderlines();
  }

  updateOrderProduct(productId: string, productAfter: Product): Promise<any> {
    return this.stockRepository.updateOrderProduct(productId, productAfter);
  }
}