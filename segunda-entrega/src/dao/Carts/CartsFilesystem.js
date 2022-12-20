import { ContainerFs } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class CartsFilesystem extends ContainerFs {
  constructor() {
    super(config.DATABASES.filesystem.CARTS_FILENAME);
  }
}