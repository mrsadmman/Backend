const express = require('express');
const app = express();
const cartRouter = requiere ("./routes/cartRoute")
const productsRouter = requiere ("./routes/productsRoute")
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log(`Se muestra en el puerto http://localhost:${PORT}`));
