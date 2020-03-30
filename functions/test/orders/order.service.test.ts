import { IMock, Times } from "moq.ts";
import { OrderRepository } from "../../src/orders/order.repository";
import { OrderService } from "../../src/orders/order.service";
import { MockProvider } from "../helpers/mockProvider";

describe('OrderService', () => {
  let mockProvider = new MockProvider();
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;
  beforeEach(() => {
    orderRepository = mockProvider.getOrderRepositoryMock();
    orderService = new OrderService(orderRepository.object());
  });
  
  it('OrderService requires orderRepository', async() => {
    const orderService = new OrderService(orderRepository.object());
    expect(orderService).toBe(orderService);
  });

  it('OrderService updateOrderlinesWithProductId method should call the orderRepository method', async() => {
    orderService.updateOrderlinesWithProductId('id');
    orderRepository.verify(or => or.updateOrderlinesWithProductId('id'), Times.Exactly(1));
  });

  it('OrderService updateOrderlinesProduct method should call the orderRepository method', async() => {
    orderService.updateOrderlinesProduct(mockProvider.getProductBefore(), mockProvider.getProductAfter());
    orderRepository.verify(or => or.updateOrderlinesProduct(mockProvider.getProductBefore(), mockProvider.getProductAfter()), Times.Exactly(1));
  });

  it('OrderService updateOrderlinesProduct should throw an exception if productBefore or productAfter name is empty', async() => {
    orderService.updateOrderlinesProduct(mockProvider.productBefore, mockProvider.productAfter);
    expect(() => {orderService.updateOrderlinesProduct(mockProvider.getProductEmptyName(), mockProvider.getProductEmptyName())}).toThrow(SyntaxError);
    expect(() => {orderService.updateOrderlinesProduct(mockProvider.getProductEmptyName(), mockProvider.getProductEmptyName())}).toThrow('ProductName cannot be empty');
  });
});