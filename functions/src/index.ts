import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './dependency-factory';

const serviceAccount = require("../service-account");
const dependencyFactory = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://productsite-911f7.firebaseio.com"
});

exports.addProduct = functions.firestore
.document('products/{productId}')
.onCreate((snap, context) => {
  return dependencyFactory.getProductController().addProduct(snap);
});

// exports.buyProduct = functions.firestore
// .document

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