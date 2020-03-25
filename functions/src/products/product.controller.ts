import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { Stock } from "../models/stock";

export interface ProductController {

  addProductToStock(snap: DocumentSnapshot, context: EventContext): Stock;
  buyProduct(snap: DocumentSnapshot, context: EventContext): any;

}