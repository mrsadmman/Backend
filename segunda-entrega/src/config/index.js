import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    
    
  },
};

export { config }