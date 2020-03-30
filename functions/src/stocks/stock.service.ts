import { Product } from "../models/product";
import { Stock } from "../models/stock";
import { StockRepository } from "./stock.repository";

export class StockService {

  constructor(private stockRepository: StockRepository) {}

  createStock(productId: string, product: Product): Promise<any> {
    const stock = this.createStockDocument(product);
    return this.createStockWithProductId(productId, stock);
  }

  createStockDocument(product: Product): Stock {
    const stock: Stock = {
      productName: product.name,
      stockCount: 5
    }
    return stock
  }

  createStockWithProductId(productId: string, stock: Stock) {
    return this.stockRepository.createStockWithProductId(productId, stock);
  }

  getStockFromOrderlines() {
    const stock = this.stockRepository.getStockFromOrderlines();
    this.subtractStockFromOrderlines(stock);
  }

  subtractStockFromOrderlines(stock: Stock): Promise<any> {
    this.stockCountZeroException(stock);
    return this.stockRepository.subtractStockFromOrderlines(stock);
  }

  updateOrderProduct(productId: string, productAfter: Product): Promise<any> {
    this.emptyProductNameException(productAfter);
    return this.stockRepository.updateOrderProduct(productId, productAfter);
  }

  stockCountZeroException(stock: Stock) {
    if (stock.stockCount === 0) {
      throw new RangeError('Stockcount cannot be 0 when subtracting');
    }
  }

  emptyProductNameException(product: Product) {
    if (product.name === "") {
      throw new SyntaxError('ProductName cannot be empty');
    }
  }
}