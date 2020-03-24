import { IMock, Mock } from 'moq.ts';
import { ProductRepository } from "../../src/products/product.repository";
import { ProductService } from '../../src/products/product.service';
import { Product } from '../../src/models/product';
import { Stock } from '../../src/models/stock';

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;
  const product: Product = {name: "someProduct"};
  const stock: Stock = {productName:"someProduct", stockCount:5}
  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
    .setup(pr => pr.addProductToStock("id",  product))
    .returns(stock)
    productService = new ProductService(productRepository.object());
  });

  it('addProductToStock should add a stock with the same productName as the added product', async() => {
    const stockAdded: Stock = productService.addProductToStock("id", product);
    expect(stockAdded.productName).toBe(product.name)
  });

  it('addProductToStock should create a stock with 5 stockCount', async() => {
    const stockAdded: Stock = productService.addProductToStock("id", product);
    expect(stockAdded.stockCount).toBe(5);
  });

});