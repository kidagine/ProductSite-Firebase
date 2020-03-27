// import { IMock, Mock } from 'moq.ts';
// import { ProductService } from '../../src/products/product.service';
// import { Product } from '../../src/models/product';
// import { Stock } from '../../src/models/stock';
// import { StockRepository } from '../../src/stocks/stock.repository';

// describe('ProductService', () => {
//   let stockRepository: IMock<StockRepository>;
//   let productService: ProductService;
//   const product: Product = { name: "someProduct" };
//   const stock: Stock = { productName:"someProduct", stockCount: 5 }
//   beforeEach(() => {
//     productService = new ProductService(productRepository.object(), stockRepository.object());
//   });

  // //Add Product
  // it('addProductToStock should add a stock with the same productName as the added product', async() => {
  //   const stockAdded: Stock = productService.createStock(product);
  //   expect(stockAdded.productName).toBe(product.name)
  // });

  // it('addProductToStock should create a stock with 5 stockCount', async() => {
  //   const stockAdded: Stock = productService.createStock(product);
  //   expect(stockAdded.stockCount).toBe(5);
  // });

  // //Buy Product
  // it('buyProduct should decrement the stockCount by one', async() => {
  //   productService.buyProduct(order.productId);
  //   expect(stock.stockCount).toBe(4);
  // });

  // it('buyProduct should add a product in order collection', async() => {

  // }); 

  // //Rename Product
  // it('renameProduct should change the product name in order, stock and product collection', async() => {

  // });
// });