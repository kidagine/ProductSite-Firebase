import { ProductRepository } from "./product.repository";

export class ProductService {

  constructor(private productRepository: ProductRepository) {}

  addProduct(productId: string) {
    this.productRepository.addProduct(productId);
  }

}