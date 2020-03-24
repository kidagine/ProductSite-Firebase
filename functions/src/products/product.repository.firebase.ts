import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";

export class ProductRepositoryFirebase implements ProductRepository {
 
  addProduct(productId: string) {
    const stockDocument = {
      stockCount: 5
    }
    admin.firestore().doc(`stocks/${productId}`).set(stockDocument).catch().then().catch();
  }

}