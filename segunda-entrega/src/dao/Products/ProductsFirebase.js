import { FirebaseContainer } from "../../containers/FirebaseContainer.js";


export class ProductsFirebase extends FirebaseContainer {
  constructor() {
    super('products');
  }
}
