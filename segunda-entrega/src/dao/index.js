import { config } from '../config/index.js';
//import { MongoDBService } from '../services/index.js';
import { CartsFilesystem, CartsMemory } from './Carts/index.js';
import { ProductsFilesystem, ProductsMemory } from './Products/index.js';

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      /* MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
      }; */
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        CartDao: new CartsFilesystem(),
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        CartDao: new CartsMemory(),
      };
    }
    case "firebase": {
      /* return {
        ProductDao: new ProductsFirebase(),
        CartDao: new CartsFirebase(),
      }; */
    }
  }
};

const { ProductDao, CartDao } = getSelectedDaos();

export { ProductDao, CartDao };

/* const instancias = [
  {
    nombre: ProductsFilesystem,
    id: "archivo",
    descripcion : "producto"
  },

  {
    nombre: ProductsFilesystem,
    id: "archivo",
    descripcion : "carrito"
  }
]
const instancia = instancias.filter(i => i.id == process.env.INSTANCIA)

const resultado = {
  [instancia[0].descripcion]: intancia[0].nombre,
  [instancia[1].descripcion]: intancia[1].nombre,

}
export default resultado; */ 
