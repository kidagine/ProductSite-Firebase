import { OrderService } from "./orders/order.service";
import { OrderRepository } from "./orders/order.repository";
import { OrderRepositoryFirebase } from "./orders/order.repository.firebase";
import { ProductService } from "./products/product.service";
import { ProductController } from "./products/product.controller";
import { ProductControllerFirebase } from "./products/product.controller.firebase";
import { StockService } from "./stocks/stock.service";
import { StockRepository } from "./stocks/stock.repository";
import { StockRepositoryFirebase } from "./stocks/stock.repository.firebase";

export class DependencyFactory {
  getProductController(): ProductController {
    const orderRepository: OrderRepository = new OrderRepositoryFirebase();
    const stockRepository: StockRepository = new StockRepositoryFirebase();
    const orderService: OrderService = new OrderService(orderRepository);
    const stockService: StockService = new StockService(stockRepository);
    const productService: ProductService = new ProductService(orderService, stockService);
    return new ProductControllerFirebase(productService);
  }
}