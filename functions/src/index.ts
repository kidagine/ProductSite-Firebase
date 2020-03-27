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
  return dependencyFactory.getProductController().renameProduct(snap, context);
});