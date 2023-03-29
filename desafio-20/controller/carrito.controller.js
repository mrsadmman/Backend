import { postCarritoService, postProductoCarritoService } from '../services/carrito.service.js';

const postCarritoController = async (req, res) => {
  await postCarritoService(req);
  return res.redirect('/api/productos');
};

const postProductoCarritoController = async (req, res) => {
  await postProductoCarritoService(req);
  return res.redirect('/api/productos');
};

export { postCarritoController, postProductoCarritoController };
