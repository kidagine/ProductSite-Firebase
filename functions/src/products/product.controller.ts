import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

export interface ProductController {

  addProduct(snap: DocumentSnapshot): any;

}