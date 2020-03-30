import { Product } from "../models/product";
import { OrderService } from "../orders/order.service";
import { StockService } from "../stocks/stock.service";

export class ProductService {

  constructor(private orderService: OrderService,private stockService: StockService) {}

  addProductToStock(productId: string, product: Product): Promise<any> {
    return this.stockService.createStock(productId, product);
  }

  buyProduct(orderId: string): Promise<any> {
    this.stockService.getStockFromOrderlines();
    return this.orderService.updateOrderlinesWithProductId(orderId);
  }

  renameProduct(productId: string, productBefore: Product, productAfter: Product): Promise<any> {
    this.stockService.updateOrderProduct(productId, productAfter).catch();
    return this.orderService.updateOrderlinesProduct(productBefore, productAfter);
  }
}