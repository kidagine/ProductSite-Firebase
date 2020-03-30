import { Orderline } from "../../src/models/orderline"
import { Product } from "../../src/models/product";
import { Stock } from "../../src/models/stock";
import { IMock, Mock } from "moq.ts";
import { OrderService } from "../../src/orders/order.service";
import { StockService } from "../../src/stocks/stock.service";
import { OrderRepository } from "../../src/orders/order.repository";
import { StockRepository } from "../../src/stocks/stock.repository";

export class MockProvider {

  getOrderServiceMock(): IMock<OrderService> {
    return new Mock<OrderService>()
      .setup(os => os.updateOrderlinesWithProductId('id'))
      .returns(Promise.resolve())
      .setup(os => os.updateOrderlinesProduct(this.productBefore, this.productAfter))
      .returns(Promise.resolve());
  }

  getStockServiceMock(): IMock<StockService> {
    return new Mock<StockService>()
      .setup(ss => ss.getStockFromOrderlines())
      .returns(Promise.resolve())
      .setup(ss => ss.createStock('id', this.product))
      .returns(Promise.resolve())
      .setup(ss => ss.updateOrderProduct('id', this.productAfter))
      .returns(Promise.resolve());  
  }

  getOrderRepositoryMock(): IMock<OrderRepository> {
    return new Mock<OrderRepository>()
      .setup(or => or.updateOrderlinesWithProductId('id'))
      .returns(Promise.resolve())
      .setup(or => or.updateOrderlinesProduct(this.productBefore, this.productAfter))
      .returns(Promise.resolve());
  }

  getStockRepositoryMock(): IMock<StockRepository> {
    return new Mock<StockRepository>()
      .setup(sr => sr.getStockFromOrderlines())
      .returns(Promise.resolve())
      .setup(sr => sr.subtractStockFromOrderlines(this.stock))
      .returns(Promise.resolve())
      .setup(sr => sr.updateOrderProduct('id', this.productAfter))
      .returns(Promise.resolve())
      .setup(sr => sr.createStockWithProductId('id', this.stock))
      .returns(Promise.resolve());
  }

  getOrderline(): Orderline {
    return this.orderline;
  }

  getProduct(): Product {
    return this.product;
  }

  getProductBefore(): Product {
    return this.productBefore;
  }

  getProductAfter(): Product {
    return this.productAfter;
  }

  getProductEmptyName(): Product {
    return this.productEmptyName;
  }

  getStock(): Stock {
    return this.stock;
  }

  getStockZeroCount(): Stock {
    return this.stockZeroCount;
  }

  orderline: Orderline = {
    productId: "testProductId",
    productName: "testProduct",
    productCount: 1
  };

  product: Product = {
    name: "testProduct"
  };

  productBefore: Product = {
    name: "testProductBefore"
  }

  productAfter: Product = {
    name: "testProductAfter"
  }

  productEmptyName: Product = {
    name: ""
  }

  stock: Stock = {
    productName: "testProduct",
    stockCount: 5
  };

  stockZeroCount: Stock = {
    productName: "testProductZeroCount",
    stockCount: 0
  }
}