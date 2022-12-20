import { ContainerFs } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class ProductsFilesystem extends ContainerFs {
  constructor() {
    super(config.DATABASES.filesystem.PRODUCTS_FILENAME);
  }
}