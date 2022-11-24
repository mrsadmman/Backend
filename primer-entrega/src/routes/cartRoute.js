const { Router } = require("express");
const Cart = require("../classes/cart");
const Container = require("../classes/container");

const cartRoute = Router();
const controller = new Container("cart");
const controllerProd = new Container("products");
const admin = require("../users/admin");

cartRoute.post("/", (req, res) => {
  let cart = new Cart();
  res.json(controller.save(cart));
});

cartRoute.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.json(controller.deleteById(id));
});

cartRoute.get("/:id/products", admin, (req, res) => {
  console.log(req.admin);
  const admin = true;
  if (admin == false) {
    res.json({ response: "Acces Denied" });
  } else {
    let { id } = req.params;

    let cart = controller.getById(id);
    console.log(cart.products);
    if (cart.products == undefined) {
      res.json({ response: "No products" });
    } else {
      res.json({ id: cart.id, products: cart.products });
    }
  }
});

cartRoute.post("/:id/products", (req, res) => {
  let { id } = req.params;
  let cart = controller.getById(id);
  let body = req.body.id_prod;

  let products = body.forEach((id_prod) => {
    let prod = controllerProd.getById(id_prod);
    cart.products.push(prod);
  });

  let response = controller.update(cart);
  res.json({ response: "Product added to the cart", cart: response });
});

cartRoute.delete("/:id/products/:id_prod", (req, res) => {
  let { id, id_prod } = req.params;
  let cart = controller.getById(id);

  let index = cart.products.findIndex((el, ind) => {
    if (el.id == id_prod) {
      return true;
    }
  });

  let newProducts = cart.products.filter((prod, ind) => prod.id != id_prod);
  cart.products = newProducts;
  let response = controller.update(cart);
  res.json({ response: "Product deleted from the cart", cart: response });
});

module.exports = cartRoute;