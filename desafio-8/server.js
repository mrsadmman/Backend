const express = require('express');
const app = express();

const Messages = require('./container/messagesContainer');
const Products = require('./container/productsContainer');
const msg = new Messages('mensajes');
const product = new Products('productos');
const moment = require('moment');
const timestamp = moment().format('h:mm a');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server with socket
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(process.env.PORT || 8080, () => console.log(`http://localhost:${process.env.PORT || 8080}`));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/', async (req, res) => {
  res.render('productslist');
});

io.on('connection', async (socket) => {
  console.log(`Someone is in your store`);
  // Muestra la lista completa de productos al cliente
  socket.emit('product-list', await product.getAll());

  // Muestra el historial completo de mensajes al cliente desde SQLite

  socket.emit('msg-list', await msg.getAll());

  // Recibe producto del cliente
  socket.on('product', async (data) => {
    // Guarda el producto nuevo en productos.json
    await productsContainer.save(data);

    // Muestra el producto por consola
    console.log('Se recibió un producto nuevo', 'producto:', data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit('product-list', await product.getAll());
  });

  // Recibe mensaje del cliente
  socket.on('msg', async (data) => {
    // Muestra el mensaje por consola
    console.log('Se recibio un msg nuevo', 'msg:', data);

    // Guarda el mensaje nuevo en mensaje en la base SQLite
    await msg.save({ socketid: socket.id, timestamp: timestamp, ...data });

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje desde SQLite
    io.emit('msg-list', await msg.getAll());
  });
});
