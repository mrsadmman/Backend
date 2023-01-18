const express = require('express');
const session = require('express-session');
const router = require('./routes/routes');
const MongoStore = require('connect-mongo');
const app = express();
const { engine } = require('express-handlebars');
const moment = require('moment');
const { normalize, schema, denormalize } = require('normalizr');
const timestamp = moment().format('h:mm a');

const Messages = require('./container/messagesContainer');
const Products = require('./container/productsContainer');
const dataMsg = new Messages();
const producto = new Products();
const contenedorProductos = new Products('productos');
const productosFS = contenedorProductos.getAll();

const generateFakeProducts = require('./utils/fakerProductGenerator');
const FakeP = generateFakeProducts(5);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function auth(req, res, next) {
  if (req.session?.user === 'juanchi' && req.session?.admin) {
    return next();
  } else {
    return res.render('noauth');
  }
}

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

app.use('/', router);

app.get('/products-lists', async (req, res) => {
  res.render('products-lists');
});

app.get('/productos-test', async (req, res) => {
  res.render('productos-test');
});

app.get('/chat', async (req, res) => {
  res.render('chat');
});

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
});

const chatSchema = new schema.Entity('chats', {
  messages: [messageSchema],
});

const normalizarData = (data) => {
  const dataNormalizada = normalize({ id: 'chatHistory', messages: data }, chatSchema);
  return dataNormalizada;
};

const normalizarMensajes = async () => {
  const messages = await dataMsg.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;
};

io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit('products-lists', await productosFS);

  socket.emit('productos-test', await FakeP);

  socket.emit('msg-list', await normalizarMensajes());

  socket.on('product', async (data) => {
    console.log('Se recibio un producto nuevo', 'producto:', data);

    await contenedorProductos.save(data);

    io.emit('products-lists', await productosFS);
  });

  socket.on('msg', async (data) => {
    await dataMsg.save({ ...data, timestamp: timestamp });

    console.log('Se recibio un msg nuevo', 'msg:', data);

    io.sockets.emit('msg-list', await normalizarMensajes());
  });
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://juantaphanel:w59YOPy8rzsU65eE@cluster0.ph6zyjw.mongodb.net/test',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: { maxAge: 60 * 1000 },
    rolling: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.post('/login', async (req, res) => {
  const { body } = req;

  if (body.username !== 'juanchi' || body.password !== 'taphanel') {
    console.log('Login fail!');
    return res.render('loginfail');
  }

  req.session.user = body.username;
  req.session.admin = true;

  console.log('Login success, user:' + body.username);
  res.render('logged', { layout: 'logged', username: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/showsession', (req, res) => {
  const mySession = JSON.stringify(req.session, null, 4);
  req.session.touch();
  res.json(req.session);
});

app.get('/logout', (req, res) => {
  const userInfo = [];
  if (userInfo.length === 0) {
    userInfo.push(req.session.user);
  }
  req.session.destroy((err) => {
    if (err) {
      res.send('no pudo deslogear');
    } else {
      res.render('logout', { username: userInfo });
    }
  });
});

app.get('/informacionconfidencial', auth, (req, res) => {
  res.render('private', { layout: 'logged', username: req.session.user, admin: req.session.admin });
});

app.get('/form', auth, (req, res) => {
  res.render('form', { layout: 'logged' });
});
