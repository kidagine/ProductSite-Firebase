import { IMock, Times} from 'moq.ts';
import { ProductService } from "../../src/products/product.service";
import { OrderService } from '../../src/orders/order.service';
import { StockService } from '../../src/stocks/stock.service';
import { MockProvider } from '../helpers/mockProvider';

describe('ProductService', () => {
  let mockProvider = new MockProvider();
  let orderService: IMock<OrderService>;
  let stockService: IMock<StockService>;
  let productService: ProductService;
  beforeEach(() => {
    orderService = mockProvider.getOrderServiceMock();
    stockService = mockProvider.getStockServiceMock();
    productService = new ProductService(orderService.object(), stockService.object());
  });

  it('ProductService requires orderService and stockService', async() => {
    const productService = new ProductService(orderService.object(), stockService.object());
    expect(productService).toBe(productService);
  });
  
  it('ProductService addProductToStock method should call the createStock method', async() => {
    productService.addProductToStock('id', mockProvider.getProduct());
    stockService.verify(ss => ss.createStock('id', mockProvider.getProduct()), Times.Exactly(1));
  })

  it('ProductService buyProduct method should call the subtractStock method', async() => {
    productService.buyProduct(mockProvider.getOrderline().productId);
    stockService.verify(ss => ss.getStockFromOrderlines(), Times.Exactly(1));
  });

  it('ProductService renameProduct method should call the subtractStock and updateOrderline methods', async() => {
    productService.renameProduct('id', mockProvider.getProductBefore(), mockProvider.getProductAfter());
    stockService.verify(ss => ss.updateOrderProduct('id', mockProvider.getProductAfter()), Times.Exactly(1));
    orderService.verify(os => os.updateOrderlinesProduct(mockProvider.getProductBefore(), mockProvider.getProductAfter()), Times.Exactly(1));
  });
});