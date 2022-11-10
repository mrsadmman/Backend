const express = require('express');
const app = express();
const PORT = 8080;
const Container = require('./container');
const container = new Container();
const ejs = require('ejs');
const server = app.listen(PORT, () => {
  console.log(`The server is running in: http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.post('/products', async (req, res) => {
  const { body } = req;
  if (body.title.length == 0 || body.price.length == 0 || body.thumbnail.length == 0) {
   
    res.json({ error: true, msg: 'Some value is missing' });
  } else {
    await container.save(body);
    res.redirect('/products');
  }
});
app.get('/products', async (req, res) => {
  const products = await container.getAll();
  console.log(products);
  let stock;
  if (products.length == 0) {
    stock = false;
  } else {
    stock = true;
  }
  console.log(stock);
  res.render('pages/productList', { products, stock });
});
app.get('/', (req, res) => {
  res.render('pages/form', {});
});