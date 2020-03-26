import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './dependency-factory';
import { Stock } from './models/stock';
import { Product } from './models/product';
import { Order } from './models/order';

const serviceAccount = require("../service-account");
const dependencyFactory = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://productsite-911f7.firebaseio.com"
});

exports.addProduct = functions.firestore
.document('products/{productId}')
.onCreate((snap, context) => {
  return dependencyFactory.getProductController().addProductToStock(snap, context);
});

exports.buyProduct = functions.firestore
.document('orders/{orderId}')
.onCreate((snap, context) => {
  return dependencyFactory.getProductController().buyProduct(snap, context);
});

exports.renameProduct = functions.firestore
.document('products/{productId}')
.onUpdate((snap, context) => {
  const product = snap.after.data() as Product;
  const productId = context.params.productId;
  admin.firestore().doc(`stocks/${productId}`).get().then(function(doc) {
    const stock = doc.data() as Stock;
    stock.productName = product.name;
    admin.firestore().doc(`stocks/${productId}`).update(stock)
    .catch(error => {
      console.log(error);
    }); 
  })
  .catch(error => {
    console.log(error);
  }); 

  admin.firestore().collectionGroup('orderlines').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {    
      const order = doc.data() as Order;
      console.log("DOC:" + order.productName);
      order.productName = product.name;
      admin.firestore().collection('orders').doc("e0PTTPzIJuaVsvxJxwCy").collection('orderlines').doc(doc.id).update(order).catch();
    });
  })
  .catch();
  //return dependencyFactory.getProductController().renameProduct();
});



// exports.renameProduct = functions.firestore
// .document('products/{productId}')
// .onUpdate((snap, context) => {
//   const productBefore = snap.before.data() as Product;
//   const productAfter = snap.after.data() as Product;
//   admin.firestore().collection('stocks')
//   .where('productId', '=', context.params.productId).get().then(snapshot => {
//     snapshot.forEach(doc => {

//     })
//   })
//   if (productAfter.name != productBefore.name) {
//     console.log("not same");
    
//   }
//   else {
//     console.log("same");
//   }
// });