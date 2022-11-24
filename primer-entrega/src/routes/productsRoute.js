const { Router } = require("express");
const Container = require("../classes/container");
const Product = require("../classes/products");

const productsRoute = Router();
const controller = new Container("products");

productsRoute.get("/", (req, res) => {
  res.json(controller.getAll());
});

productsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await controller.getById(id);
    if (!product) {
        res.json({ error: true, msj: "id not found" });
    } else {
        res.send({ success: true, product: product });
    }
});

productsRoute.post("/", (req, res) => {
  let body = req.body;
  let product = new Product(
    body.name,
    body.description,
    body.code,
    body.thumnail,
    body.price,
    body.stock
  );
  res.json(controller.save(product));
});
productsRoute.put("/:id", (req, res) => {
  let { id } = req.params;
  let product = { ...req.body, id: parseInt(id) };
  res.json(controller.update(product));
});
productsRoute.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.json(controller.deleteById(id));
});

module.exports = productsRoute;