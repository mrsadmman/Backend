const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const moment = require('moment');
const timestamp = moment().format('h:mm a');

const Messages = require('./container/messagesContainer');
const Products = require('./container/productsContainer');
const msg = new Messages('mensajes');
const product = new Products('productos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server with socket
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(process.env.PORT || 8080, () => console.log(`http://localhost:${process.env.PORT || 8080}`));

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);
app.get('/', (req, res) => {
  res.render('partials/form', {});
});

app.get('/products', async (req, res) => {
  const products = await product.getAll();
  console.log(products);
  let stock;
  if (products.length == 0) {
    stock = false;
  } else {
    stock = true;
  }
  console.log(stock);
  res.render('/home/juan/Backend/desafio-8/views/productslist.hbs', { products, stock });
});

io.on('connection', async (socket) => {
  console.log(`Someone is in your store`);

  socket.emit('msg-list', await msg.getAll());

  socket.on('product', async (data) => {
    await product.save(data);

    console.log('Se recibió un producto nuevo', 'producto:', data);

    io.emit('product-list', await product.getAll());
  });

  socket.on('msg', async (data) => {
    console.log('Se recibio un msg nuevo', 'msg:', data);

    await msg.save({ socketid: socket.id, timestamp: timestamp, ...data });

    io.emit('msg-list', await msg.getAll());
  });
});
