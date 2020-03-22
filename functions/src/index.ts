import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './dependency-factory';

const serviceAccount = require("../secret.json")
const dependencyFactory = new DependencyFactory

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://productsite-911f7.firebaseio.com"
});