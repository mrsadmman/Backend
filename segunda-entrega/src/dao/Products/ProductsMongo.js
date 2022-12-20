import { MongoDBContainer } from "../../containers/index.js";
import { productModel } from "../../models/index.js";

export class ProductsMongo extends MongoDBContainer {
  constructor() {
    super({
      name: productModel.ProductsCollection,
      schema: productModel.ProductSchema,
    });
  }
}