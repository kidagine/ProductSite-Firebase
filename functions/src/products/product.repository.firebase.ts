import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Stock } from '../models/stock';
import { Product } from '../models/product';
import { Order } from '../models/order';

const tempProductId = "KJjUBtJvVxqi49ZEvqqO";

export class ProductRepositoryFirebase implements ProductRepository {
 
  addProductToStock(productId: string, stock: Stock): Promise<any> {
    //Creates a new Stock object and sets it in the stock document with the product Id
    return admin.firestore().doc(`stocks/${productId}`).set(stock).catch();
  }


  buyProduct(orderId: string): Promise<any> {
    //Creates a subcollection orderlines inside the newly created order document, and sets appropriate data
    admin.firestore().doc(`orders/${orderId}`).collection(`orderlines`).doc(tempProductId).set({
      productId: tempProductId,
      productName: "tempProduct",
      productCount: 1
    })
    .catch(error => {
      console.log(error);
    });  
  
    //Gets the stock document that has the same product id with the one in orderlines, and subtracts by one from the stockCont
    return admin.firestore().collection(`stocks`).doc(tempProductId).get().then(function(doc) {
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
  }

  renameProduct(productId: string, productBefore: Product, productAfter: Product): Promise<any> {
    //Gets the stock document that matches the product Id and sets it's productName to the after product name
    admin.firestore().doc(`stocks/${productId}`).get().then(function(doc) {
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
  
    //Gets the orderline subcollections where the productName equals that of the updated product, and sets it's productName to the after product name
    return admin.firestore().collectionGroup('orderlines').where('productName', '==', productBefore.name).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {    
        const order = doc.data() as Order;
        const orderId: string = doc.ref.parent.parent!.id
        order.productName = productAfter.name;
        admin.firestore().collectionGroup('orderlines')
        admin.firestore().collection('orders').doc(orderId).collection('orderlines').doc(doc.id).update(order).catch();
      });
    })
    .catch(error => {
      console.log(error);
    }); 
  }
}