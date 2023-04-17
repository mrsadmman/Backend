import ContenedorMongo from './mongoDAO.js';
import ContenedorMem from './memDAO.js';
import Carrito from '../models/carrito.js';
import Productos from '../models/productos.js';
import ENV from "../config/env.config.js"

let DAO;
let productosArray = [
  {
    _id: 1,
    title: 'Fernet',
    description: 'Alcohol',
    code: 'A01',
    price: 2000,
    stock: 10,
    thumbnail: 'https://carrefourar.vtexassets.com/arquivos/ids/226775/7790290101602_02.jpg?v=637715449494370000',
    timestamp: '21/11/2022, 21:50:10',
  },
  {
    _id: 2,
    title: 'Whisky',
    description: 'Alcohol',
    code: 'A02',
    price: 6000,
    stock: 15,
    thumbnail: 'https://jumboargentina.vtexassets.com/arquivos/ids/692364/Whisky-Ballantines-Finest-700ml-1-886753.jpg?v=637819402359800000',
    timestamp: '12/2/2023, 17:40:32',
  },
  {
    _id: 3,
    title: 'Vodka',
    description: 'Alcohol',
    code: 'A03',
    price: 9000,
    stock: 8,
    thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/grey-goose-1-litro11-d055b15800e7d59b6615835869609628-640-0.webp',
    timestamp: '12/2/2023, 17:40:32',
  },
];
let carrito = [
  {
    id: 1,
    productos: [
      {
        title: 'Fernet',
        description: 'Alcohol',
        code: 'A01',
        price: 2000,
        stock: 10,
        thumbnail: 'https://carrefourar.vtexassets.com/arquivos/ids/226775/7790290101602_02.jpg?v=637715449494370000',
        timestamp: '21/11/2022, 21:50:10',
        _id: 1,
      },
      {
        title: 'Whisky',
        description: 'Alcohol',
        code: 'A02',
        price: 6000,
        stock: 15,
        thumbnail: 'https://jumboargentina.vtexassets.com/arquivos/ids/692364/Whisky-Ballantines-Finest-700ml-1-886753.jpg?v=637819402359800000',
        timestamp: '12/2/2023, 17:40:32',
        _id: 2,
      },
      {
        title: 'Vodka',
        description: 'Alcohol',
        code: 'A03',
        price: 9000,
        stock: 8,
        thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/861/458/products/grey-goose-1-litro11-d055b15800e7d59b6615835869609628-640-0.webp',
        timestamp: '12/2/2023, 17:40:32',
        _id: 3,
      },
    ],
  },
];

const modo = ENV.MODE
if (modo == "PROD") {
  DAO = { carrito: new ContenedorMongo(Carrito), productos: new ContenedorMongo(Productos) };
} else if (modo == "DEV") {
  DAO = { carrito: new ContenedorMem(carrito), productos: new ContenedorMem(productosArray) };
} else {
  throw "Es necesario indicar el tipo de persistencia"
}

export default DAO;