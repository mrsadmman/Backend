import { Router } from "express";
import { CartDao, ProductDao } from "../../dao/index.js";
import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";

const router = Router();

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ sucess: true, cartId: cart.id });
});

router.post("/:cartId/products", async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(Number(cartId));

  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
  const product = await ProductDao.getById(Number(productId));
  if (!product)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

  cart.products.push(product);

  const updateCart = await CartDao.updateById(Number(cartId), cart);

  res.send({ success: true, cart: updateCart });
});

router.delete("/:cartId/products/:id_prod", async (req, res) => {
  try {
    const { cartId } = req.params;
    const { id_prod } = req.params;

    const cart = await CartDao.getById(Number(cartId));

    if (!cart) {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
    } else {
      const product = await ProductDao.getById(Number(id_prod));

      if (!product)
        return res.send({
          error: true,
          message: ERRORS_UTILS.MESSAGES.NO_PRODUCT,
        });

      const foundElementIndex = cart.products.findIndex(
        (element) => element.id == id_prod
      );

      if (foundElementIndex === -1)
        return res.send({
          error: true,
          message: ERRORS_UTILS.MESSAGES.NO_PRODUCT,
        });

      cart.products.splice(foundElementIndex, 1);
      res.send({
        success: true,
        message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}`,
      });
    }
    const updatedCart = await CartDao.updateById(Number(cartId), cart);
    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    console.log(error, `Error desde CartRouter - Delete CartID/IDprod`);
  }
});

export { router as CartRouter };