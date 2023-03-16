import { warnLogger } from './config/logger.config.js';
import { httpServer, app } from './config/appServer.config.js';
import initOptions from './config/initArgs.config.js';
import routerCarrito from './router/carrito.routes.js';
import routerProductos from './router/productos.routes.js';
import routerUsuarios from './router/usuarios.routes.js';
import routerRandoms from './router/randoms.routes.js';
import './db/mongoDAO.js';

const PORT = process.env.PORT || initOptions.port;
const HOST = process.env.HOST;
const ROUTE = process.env.ROUTE;
const server = httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en http://${HOST}:${PORT}${ROUTE}`);
});

server.on('Error', (error) => console.log(`Error en servidor ${error}`));

app.use('/api/usuarios', routerUsuarios);
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/randoms', routerRandoms);

app.get('/api/chat', async (req, res) => {
  res.render('chat');
});

app.get('*', (req, res, next) => {
  warnLogger.warn({ metodo: req.method, path: req.path });
  next();
});

process.on('SIGINT', function () {
  console.log('\nCerrando servidor');
  process.exit(0);
});
