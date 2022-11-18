const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const Container = require('./src/container');
const ContainerMsg = require('./src/containerMsg');
const msg = new ContainerMsg();
const product = new Container();
const moment = require('moment');
const timestamp = moment().format('h:mm a');

httpServer.listen(process.env.PORT || 8080, () => console.log(`http://localhost:${process.env.PORT || 8080}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', async (socket) => {
  console.log(`Someone is in your store`);
  socket.on('productsData', async (data) => {
    await product.save(data);
    io.emit('product-list', await product.getAll());
  });

  socket.on('msg', async (data) => {
    await msg.save({ socketId: socket.id, timestamp: timestamp, ...data });
    io.emit('msg-list', await msg.getAll());
  });
});
