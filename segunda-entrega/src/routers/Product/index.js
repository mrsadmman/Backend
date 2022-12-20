import { Router } from "express"
import {ProductDao} from "../../dao/index.js"
import { DATE_UTILS, JOI_VALIDATOR, ERRORS_UTILS } from "../../utils/index.js"
import {verifyRole} from "../../middlewares/index.js"

const router = Router()

router.get("/", async (req, res) => {
    const product = await ProductDao.getAll();

if (!product){
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
}
    res.send(product)
} )

router.get("/:id", async (req, res) => {
    
    const {id} = req.params  
    const product = await ProductDao.getById(Number(id)) 

    res.send(product)
} )

router.post("/",verifyRole, async (req, res) => {
    try{
    const {title, description, code, thumbnail, price, stock } = req.body
    
    const product = await JOI_VALIDATOR.product.validateAsync(
        {title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() 
    })
    
    const creatProduct = await ProductDao.save(product)
    res.send(creatProduct);
} 
catch(error){
    res.send(error)
}})

router.delete("/:id", async (req, res) => {
 try{
    const {id} = req.params;
   await ProductDao.deleteById(Number(id));
    
    res.send({succes: true})
 }
 catch (error) {
     res.send({error: "ocurrio un error"})
 }
} )

router.put("/:id", async (req,res) => { 
    try{
    const {id} = req.params;
    const {title, description, code, thumbnail, price, stock } = req.body;

   const updateProduct = await ProductDao.updateById(id, {title, description, code, thumbnail, price, stock})
    res.send({sucees:true, data: {update: updateProduct}})
    }
    catch (error) {
        res.send({error: "ocurrio un error"})
    }
  });
  
  
export { router as ProductRouter }