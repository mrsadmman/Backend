import { Router } from 'express';
import { getProductosController, postProductosController, getProductosRandomController, postProductosRandomController } from '../controller/productos.controller.js';
import { userAuth } from '../controller/usuarios.controller.js';
import upload from '../config/multer.config.js';
const routerProductos = new Router();

routerProductos.get(`/`, userAuth, getProductosController);
routerProductos.post(`/`, upload.single('thumbnail'), userAuth, postProductosController);

routerProductos.get(`/random`, userAuth, getProductosRandomController);
routerProductos.post(`/random`, upload.single('thumbnail'), userAuth, postProductosRandomController);

export default routerProductos;
