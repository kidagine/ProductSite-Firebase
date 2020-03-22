import { OrderService } from "./orders/order.service";
import { OrderRepository } from "./orders/order.repository";
import { OrderController } from "./orders/order.controller";
import { OrderRepositoryFirebase } from "./orders/order.repository.firebase";
import { OrderControllerFirebase } from "./orders/order.controller.firebase";
import { ProductService } from "./products/product.service";
import { ProductRepository } from "./products/product.repository";
import { ProductController } from "./products/product.controller";
import { ProductRepositoryFirebase } from "./products/product.repository.firebase";
import { ProductControllerFirebase } from "./products/product.controller.firebase";
import { StockService } from "./stocks/stock.service";
import { StockRepository } from "./stocks/stock.repository";
import { StockController } from "./stocks/stock.controller";
import { StockRepositoryFirebase } from "./stocks/stock.repository.firebase";
import { StockControllerFirebase } from "./stocks/stock.controller.firebase";

export class DependencyFactory {
  getOrderController(): OrderController {
    const orderRepository: OrderRepository = new OrderRepositoryFirebase();
    const orderService: OrderService = new OrderService(orderRepository);
    return new OrderControllerFirebase(orderService);
  }

  getProductController(): ProductController {
    const productRepository: ProductRepository = new ProductRepositoryFirebase();
    const productService: ProductService = new ProductService(productRepository);
    return new ProductControllerFirebase(productService);
  }

  getStockController(): StockController {
    const stockRepository: StockRepository = new StockRepositoryFirebase();
    const stockService: StockService = new StockService(stockRepository);
    return new StockControllerFirebase(stockService);
  }
}