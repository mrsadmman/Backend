import { Router } from 'express';
import { getRandomInfoController, getRandomNumbersController } from '../controller/randoms.controller.js';

const routerRandoms = new Router();

routerRandoms.get('/info', getRandomInfoController);
routerRandoms.get('/randomNumber', getRandomNumbersController);

export default routerRandoms;
