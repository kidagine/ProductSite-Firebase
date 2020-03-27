import * as admin from 'firebase-admin';
import { Product } from '../models/product';
import { Orderline } from '../models/order';

const tempProductId = "KJjUBtJvVxqi49ZEvqqO";

export class OrderRepositoryFirebase {
  
  updateOrderlinesWithProductId(orderId: string): Promise<any> {
    //Creates a subcollection orderlines inside the newly created order document, and sets appropriate data
    return admin.firestore().doc(`orders/${orderId}`).collection(`orderlines`).doc(tempProductId).set({
      productId: tempProductId,
      productName: "tempProduct",
      productCount: 1
    })
    .catch(error => {
      console.log(error);
    });  
  }

  updateOrderlinesProduct(productBefore: Product, productAfter: Product): Promise<any> {
    //Gets the orderline subcollections where the productName equals that of the updated product, and sets its productName to the after product name
    return admin.firestore().collectionGroup('orderlines').where('productName', '==', productBefore.name).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) { 
        const orderLine = doc.data() as Orderline;
        const orderId: string = doc.ref.parent.parent!.id
        orderLine.productName = productAfter.name;
        admin.firestore().collectionGroup('orderlines')
        admin.firestore().collection('orders').doc(orderId).collection('orderlines').doc(doc.id).update(orderLine).catch();
      });
    })
    .catch(error => {
      console.log(error);
    }); 
  }
}