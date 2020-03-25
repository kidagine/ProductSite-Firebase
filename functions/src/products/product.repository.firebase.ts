import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Product } from '../models/product';
import { Stock } from '../models/stock';

const tempProductId = "KJjUBtJvVxqi49ZEvqqO";

export class ProductRepositoryFirebase implements ProductRepository {
 
  addProductToStock(productId: string, product: Product): Stock {
    //Creates a new Stock object and sets it in the stock document with the product Id
    const stockDocument: Stock = {
      productName: product.name,
      stockCount: 5
    }
    admin.firestore().doc(`stocks/${productId}`).set(stockDocument)
    .catch(error => {
      console.log(error);
    });  
    return stockDocument;
  }


  buyProduct(orderId: string) {
    //Creates a subcollection orderlines inside the newly created order coument, and sets appropriate data
    admin.firestore().doc(`orders/${orderId}`).collection(`orderlines`).doc(tempProductId).set({
      productId: tempProductId,
      productName: "tempProduct",
      productCount: 1
    })
    .catch(error => {
      console.log(error);
    });  
  
    //Gets the stock document that has the same product id with the one in orderlines, and subtracts by one from the stockCont
    admin.firestore().collection(`stocks`).doc(tempProductId).get().then(function(doc) {
      const stock = doc.data() as Stock;
      stock.stockCount--;
      admin.firestore().collection(`stocks`).doc(tempProductId).update(stock)
      .catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });  
    return;
  }

}