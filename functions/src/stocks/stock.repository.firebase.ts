import * as admin from 'firebase-admin';
import { Product } from '../models/product';
import { Stock } from "../models/stock";
import { StockRepository } from "./stock.repository";

const tempProductId = "KJjUBtJvVxqi49ZEvqqO";

export class StockRepositoryFirebase implements StockRepository {

  createStockWithProductId(productId: string, stock: Stock): Promise<any> {
    //Sets new stock in the stock document with the product Id
    return admin.firestore().doc(`stocks/${productId}`).set(stock)
    .catch(error => {
      console.log(error);
    });
  }

  getStockFromOrderlines() {
    admin.firestore().collection(`stocks`).doc(tempProductId).get().then(function(doc) {
      const stock = doc.data() as Stock
      return stock;
    });
    return null;
  }

  subtractStockFromOrderlines(stock: Stock): Promise<any> {
    //Gets the stock document that has the same product id with the one in orderlines, and subtracts by one from the stockCount
    return admin.firestore().collection(`stocks`).doc(tempProductId).get().then(function(doc) {
      stock.stockCount--;
      
      admin.firestore().collection(`stocks`).doc(tempProductId).update(stock)
      .catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });  
  }

  updateOrderProduct(productId: string, productAfter: Product): Promise<any> {
    //Gets the stock document that matches the product Id and sets its productName to the after product name
    return admin.firestore().doc(`stocks/${productId}`).get().then(function(doc) {
      const stock = doc.data() as Stock;
      stock.productName = productAfter.name;
      admin.firestore().doc(`stocks/${productId}`).update(stock)
      .catch(error => {
        console.log(error);
      }); 
    })
    .catch(error => {
      console.log(error);
    }); 
  }
} 