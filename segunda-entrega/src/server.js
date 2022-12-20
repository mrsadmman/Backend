import { config } from "./config/index.js";
import express from "express"
import { ProductRouter, CartRouter } from "./routers/index.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

const server = app.listen(config.SERVER.PORT, () => console.log(`server running on port https://localhost:${server.address().port}`))