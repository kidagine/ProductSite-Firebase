import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

export class ProductControllerFirebase implements ProductController {
  
  constructor(private productService: ProductService) {}

  addProduct(snap: DocumentSnapshot) {
    this.productService.addProduct(snap.id);
    return;
  }

}