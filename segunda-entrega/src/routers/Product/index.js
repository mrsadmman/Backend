import { Router } from 'express';
import { ProductDao } from '../../dao/index.js';
import { DATE_UTILS, JOI_VALIDATOR, ERRORS_UTILS } from '../../utils/index.js';
import { verifyRole } from '../../middlewares/index.js';
import moment from "moment";

const router = Router();

router.get('/', async (req, res) => {
  const product = await ProductDao.getAll();

  if (!product) {
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
  }
  res.send(product);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductDao.getById(id);

  res.send(product);
});

router.post('/', verifyRole, async (req, res) => {
  const { body } = req;
    const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
    const id = await ProductDao.save(
      timestamp,
      body.title,
      body.description,
      body.code,
      body.thumbnail,
      body.price,
      body.stock
    );
    res.json('Product added with id: ' + id);
  
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ProductDao.deleteById(Number(id));

    res.send({ succes: true });
  } catch (error) {
    res.send({ error: 'error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    const { body } = req;
    const timestamp = moment().format("DD / MM / YYYY, h:mm:ss");
    const resultado = await ProductDao.replace(
      id,
      timestamp,
      body.title,
      body.description,
      body.code,
      body.thumbnail,
      body.price,
      body.stock
    );
    res.json(resultado);
  } catch {
    res.json("error");
  }
});

export { router as ProductRouter };
