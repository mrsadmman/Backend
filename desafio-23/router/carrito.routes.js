import { Router } from 'express';
import { userAuth } from '../controller/usuarios.controller.js';
import { deleteProductoCarritoController, postCarritoController, postProductoCarritoController } from '../controller/carrito.controller.js';

const routerCarrito = new Router();

routerCarrito.post('/', userAuth, postCarritoController);
routerCarrito.post('/producto/:id', userAuth, postProductoCarritoController);
routerCarrito.delete("/producto/:id", userAuth, deleteProductoCarritoController);

export default routerCarrito;
