import { IMock, Times } from "moq.ts";
import { StockService } from '../../src/stocks/stock.service';
import { StockRepository } from "../../src/stocks/stock.repository";
import { Stock } from "../../src/models/stock";
import { MockProvider } from "../helpers/mockProvider";

describe('StockService', () => {
  let mockProvider = new MockProvider();
  let stockRepository: IMock<StockRepository>;
  let stockService: StockService;
  beforeEach(() => {
    stockRepository = mockProvider.getStockRepositoryMock();
    stockService = new StockService(stockRepository.object());
  });

  it('StockService requires stockRepository', async() => {
    const stockService = new StockService(stockRepository.object());
    expect(stockService).toBe(stockService);
  });

  it('StockService createStockDocument should return a stock with the product name and a stock count of 5', async() => {
    const stock: Stock = stockService.createStockDocument(mockProvider.getProduct());
    expect(stock.productName).toBe(mockProvider.getStock().productName);
    expect(stock.stockCount).toBe(mockProvider.getStock().stockCount);
  });

  it('StockService createStock method should call the stockRepository method', async() => {
    stockService.createStockWithProductId('id', mockProvider.getStock())
    stockRepository.verify(sr => sr.createStockWithProductId('id', mockProvider.getStock()), Times.Exactly(1));
  });

  it('StockService getStockFromOrderlines() method should call the stockRepository method', async() => {
    stockService.getStockFromOrderlines();
    stockRepository.verify(sr => sr.getStockFromOrderlines(), Times.Exactly(1));
  });

  it('StockService subtrackFromOrderlines method should call the stockRepository method', async() => {
    stockService.subtractStockFromOrderlines(mockProvider.getStock());
    stockRepository.verify(sr => sr.subtractStockFromOrderlines(mockProvider.getStock()), Times.Exactly(1));
  });

  it('StockService updateOrderlines method should call the stockRepository method', async() => {
    stockService.updateOrderProduct('id', mockProvider.getProductAfter());
    stockRepository.verify(sr => sr.updateOrderProduct('id', mockProvider.getProductAfter()), Times.Exactly(1));
  });

  it('StockService subtrackFromOrderlines method should throw an exception if the stockCount is at 0', async() => {
    stockService.subtractStockFromOrderlines(mockProvider.stock);
    expect(() => {stockService.subtractStockFromOrderlines(mockProvider.getStockZeroCount())}).toThrow(RangeError);
    expect(() => {stockService.subtractStockFromOrderlines(mockProvider.getStockZeroCount())}).toThrow('Stockcount cannot be 0 when subtracting')
  });

  it('OrderService updateOrderProduct should throw an exception if productAfter name is empty', async() => {
    stockService.updateOrderProduct('id', mockProvider.productAfter);
    expect(() => {stockService.updateOrderProduct('id', mockProvider.getProductEmptyName())}).toThrow(SyntaxError);
    expect(() => {stockService.updateOrderProduct('id', mockProvider.getProductEmptyName())}).toThrow('ProductName cannot be empty');
  });
});