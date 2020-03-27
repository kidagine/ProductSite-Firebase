// import { StockService } from "../../src/stocks/stock.service";
// import { Product } from "../../src/models/product";
// import { Stock } from "../../src/models/stock";

// describe('ProductService', () => {
//   let stockService: StockService;
//   const product: Product = { name: "someProduct" };
//   beforeEach(() => {
//     stockService = new StockService();
//   });

//   //Add Product
//   it('addProductToStock should add a stock with the same productName as the added product', async() => {
//     const stockAdded: Stock = stockService.createStock(product);
//     expect(stockAdded.productName).toBe(product.name)
//   });

//   it('addProductToStock should create a stock with 5 stockCount', async() => {
//     const stockAdded: Stock = stockService.createStock(product);
//     expect(stockAdded.stockCount).toBe(5);
//   });
// });