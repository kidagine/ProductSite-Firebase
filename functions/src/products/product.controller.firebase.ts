import { EventContext, Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { Product } from "../models/product";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

export class ProductControllerFirebase implements ProductController {
  
  constructor(private productService: ProductService) {}

  addProductToStock(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    const product = snap.data() as Product;
    return this.productService.addProductToStock(context.params.productId, product);
  }

  buyProduct(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    return this.productService.buyProduct(context.params.orderId);
  }

  renameProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
    const beforeProduct = snap.before.data() as Product;
    const afterProduct = snap.after.data() as Product;
    return this.productService.renameProduct(context.params.productId, beforeProduct, afterProduct);
  }
}