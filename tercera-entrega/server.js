const express = require('express');
const session = require('express-session');
const config = require('./config/config');
const { errorLogger, warnLogger } = require('./loggerConfig');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
/* const Usuarios = require('./models/usuarios');*/
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const moment = require('moment');
const multer = require("multer");
const { normalizeChat } = require("./normalizr")
const { sendMail, sendCartMail } = require("./nodemailer");
const { sendPhoneMsg, sendWhatsAppMsg } = require("./twilio");
const { chatLog, products, Usuarios, carrito }= require ("./container/container")
const { createNProducts } = require ("./faker")
const app = express();

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`NODE_ENV=${config.NODE_ENV}`);

httpServer.listen(config.PORT, () => console.log(`Listening on http://${config.HOST}:${config.PORT}`));

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const NODE_ENV = process.env.NODE_ENV;
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT;
let HOST = '0.0.0.0';

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });

//SESSION
const MongoStore = require('connect-mongo');
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      socket: {
        port: PORT,
        host: HOST,
      },
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000, //10 min
      },
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  })
);
mongoose
  .connect(MONGOURL)
  .then(() => console.log('\x1b[32m', 'Connected to Mongo ✅'))
  .catch((err) => next(err));

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, async function (err, user) {
        if (err) {
          res.render('usuario-registrado');
          console.log('❌ Error in SignUp: ' + err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, false);
        }

        let timestamp = new Date().toLocaleString();
        const idNumber = await carrito.save({
          timestamp,
          productos: [],
        });

        const newUser = {
          username: username,
          password: createHash(password),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          edad: req.body.edad,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
          carrito_id: idNumber,
          
        };
        sendMail(newUser);
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('❌ Error in Saving user: ' + err);
            return done(err);
          }
          console.log(user);
          console.log('User Registration succesful ✅');
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});
app.use(passport.initialize());
app.use(passport.session());


//HBS
app.set("view engine", "hbs");
app.set("views", ".//views");
app.use(express.static("./images"));
app.use(express.static("public"));
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);


//ROUTES
app.use((req, res, next) => {
  warnLogger.info({ metodo: req.method, path: req.path });
  next();
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/loginError");
  }
};

app.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  } else {
    res.render("register");
  }
});

app.post(
  `/register`,
  upload.single("thumbnail"),
  passport.authenticate("signup", { failureRedirect: "/registerErrorAuth" }),
  (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  }
);

app.get("/registerErrorAuth", (req, res) => {
  res.render("registerErrorAuth");
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  } else {
    res.render("login");
  }
});

app.post(
  `/login`,
  upload.single("thumbnail"),
  passport.authenticate("login", { failureRedirect: "/loginErrorAuth" }),
  (req, res) => {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("form", { user });
  }
);

app.get("/loginError", (req, res) => {
  res.render("loginError");
});

app.get("/loginErrorAuth", (req, res) => {
  res.render("loginErrorAuth");
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.render("login");
});

app.get(`/`, auth, async (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("form", { user });
});

app.get(`/productos`, auth, async (req, res) => {
  const allProducts = await products.getAll();
  res.render("products", { products: allProducts, productsExist: true });
});

app.post(`/productos`, upload.single("thumbnail"), auth, (req, res) => {
  let timestamp = new Date().toLocaleString();
  const title = req.body.title;
  const description = req.body.description;
  const code = req.body.code;
  const price = req.body.price;
  const stock = req.body.stock;
  const thumbnail = req.body.thumbnail;
  products.save({
    title,
    description,
    code,
    price,
    stock,
    thumbnail,
    timestamp,
  });
  return res.redirect("/");
});

app.post("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const producto = await products.getById(id);
  carrito_usuario[0].productos.push(producto[0]);
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
  return res.redirect("/productos");
});

app.post("/finalizarCarrito", async (req, res) => {
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productos = carrito_usuario[0].productos;
  sendCartMail(req.user.username, productos);
  sendWhatsAppMsg(JSON.stringify(productos, null, 4));
  sendPhoneMsg(req.user.telefono);
  carrito_usuario[0].productos = [];
  carrito.editById(req.user.carrito_id, carrito_usuario[0]);
  return res.redirect("/productos");
});

app.get(`/productos-test`, auth, (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  res.render("productsRandom", {
    products: productsArray,
    productsExist: true,
  });
});

app.post(`/productos-test`, upload.single("thumbnail"), auth, (req, res) => {
  let productsArray = [];
  createNProducts(productsArray, 5);
  productsArray.forEach((product) => products.save(product));
  res.json({ msg: "Products created" });
});

app.get(`/user-info`, auth, async (req, res) => {
  const id = req.user._id.toHexString();
  const { username, nombre, direccion, edad, telefono, avatar } = req.user;
  const carrito_usuario = await carrito.getById(req.user.carrito_id);
  const productosCarrito = carrito_usuario[0].productos;
  res.render("user-info", { username, id, nombre, direccion, edad, telefono, avatar, productos: productosCarrito });
});

app.get(`/info`, (req, res) => {
  res.json({
    "Argumentos de entrada": process.argv.slice(2),
    "Path de ejecución": process.argv[0],
    "Sistema operativo": process.platform,
    "ID del proceso": process.pid,
    "Versión de Node": process.version,
    "Carpeta del proyecto": process.cwd(),
    "Memoria total reservada": process.memoryUsage().rss,
  });
});

//Fork
app.get(`/api/randoms`, (req, res) => {
  let msg = 0;
  req.query.hasOwnProperty("cant") ? (msg = parseInt(req.query.cant)) : (msg = 10000);

  let arrayRandomNum = [];
  let arrayUsedNumber = [];
  let arrayRepeatedResult = [];
  for (let i = 0; i < msg; i++) {
    arrayRandomNum.push(Math.floor(Math.random() * 1000) + 1);
  }

  arrayRandomNum.forEach((num) => {
    if (!arrayUsedNumber.includes(num)) {
      arrayUsedNumber.push(num);
      arrayRepeatedResult.push({
        [num]: arrayRandomNum.filter((repeatedNum) => repeatedNum == num).length,
      });
    }
  });

  res.json({
    Numeros_generados:
      "Usted ha generado " +
      msg +
      " números. Estos, agrupados por repetición, generaron un array de " +
      arrayRepeatedResult.length +
      " elementos",
    numeros: arrayRepeatedResult,
  });
});

app.get("*", (req, res, next) => {
  warnLogger.warn({ metodo: req.method, path: req.path });
  next();
});

//NORMALIZE
const { normalize, schema, denormalize } = require('normalizr');

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


//WEBSOCKET

io.on("connection", async (socket) => {
  const allProducts = await products.getAll();
  io.sockets.emit("lastProducts", allProducts);

  const chat = await chatLog.getAll();
  const normalizedChat = normalizeChat(chat);
  socket.emit("chat", normalizedChat);

  socket.on("userMsg", async (data) => {
    await chatLog.save(data);
    const chat = await chatLog.getAll();
    const normalizedChat = normalizeChat(chat);
    io.sockets.emit("chat", normalizedChat);
  });
});

process.on("SIGINT", function () {
  console.log("\nCerrando servidor");
  process.exit(0);
});