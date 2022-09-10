const express = require ("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({extended:true}));

const { getAllProducts, getProduct, postProduct, putProduct, deleteProduct  } = require("./service")

productRouter.get("/:id?", async (req, res) => {
  const id = parseInt(req.params.id);
  if (id){
    const prodFound = await getProduct(id)
    res.send(prodFound)
  }else {
    const allProducts = await getAllProducts()
    res.send(allProducts)
  }
})

productRouter.post("/", async ( req, res ) => {
  const productToAdd = {
    title:req.body.title,
    description:req.body.description,
    code:req.body.code,
    price:parseInt(req.body.price),
    thumbnail:req.body.thumbnail,
    stock:req.body.stock
  }
  if (productToAdd === undefined){res.status(400).send({error: "product no puede ser 'undefined'"})}
  else {
    const response = await postProduct(productToAdd)
    res.send(response)
  }

})

productRouter.put('/:idNumber', async ( req, res ) => {
  
    const idProduct = parseInt(req.params.idNumber);
    const productUpdate = req.body;
    if (productUpdate === undefined){res.status(400).send({error: "productUpdate no puede ser 'undefined'"})}
    else {
      const response = await putProduct(idProduct, productUpdate)
      res.send(response)
    }
  

})

productRouter.delete('/:idNumber', async ( req, res ) => {
    const idProduct = parseInt(req.params.idNumber);
    const response = await deleteProduct(idProduct)
    res.send(response)
})

module.exports = { productRouter }