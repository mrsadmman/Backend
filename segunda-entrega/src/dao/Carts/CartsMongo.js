import { MongoDBContainer } from "../../containers/index.js";
import { cartModel } from "../../models/index.js";

export class CartsMongo extends MongoDBContainer {
  constructor() {
    super({
      name: cartModel.CartCollection,
      schema: cartModel.CartSchema,
    });
  }

  async getById(id) {
    const response = await this.model.findById(id).populate("products");

    return response;
  }
}