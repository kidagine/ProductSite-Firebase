import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Product } from '../models/product';
import { Stock } from '../models/stock';

export class ProductRepositoryFirebase implements ProductRepository {
 
  addProductToStock(productId: string, product: Product): Stock {
    const stockDocument : Stock = {
      productName: product.name,
      stockCount: 5
    }
    admin.firestore().doc(`stocks/${productId}`).set(stockDocument).catch().then().catch();
    return stockDocument;
  }

}