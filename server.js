const express = require("express");
const Contenedor = require("./contenedor");
const loginCheck = require("./middlewares/loginCheck")
const validationCheck = require("./middlewares/validationCheck")

const products = new Contenedor ("products.txt")
const carts = new Contenedor ("carts.txt");

products.loadPrevContent();
carts.loadPrevContent();

const app = express();
app.use(express.static("public"));
app.use(express.json());

const routerProducts = express.Router();
const routerCart = express.Router();

routerProducts.get("/:idNumber?", loginCheck, async (req,res) => {
    const idProduct = parseInt(req.params.idNumber)
    if (!idProduct){
        const productsList = await products.getAll()
        res.send(productsList)
    }
    else {
        const product = await products.getById(idProduct) 
        res.send( product )
    }
})

routerProducts.post("/", loginCheck, validationCheck ,(req,res) => {
    const productToAdd = {
        title:req.body.title,
        description:req.body.description,
        code:req.body.code,
        price:parseInt(req.body.price),
        thumbnail:req.body.thumbnail,
        stock:req.body.stock
    }
    if (productToAdd === undefined){res.status(400).send({error: "product no puede ser 'undefined'"})}
    else{
        products.save(productToAdd)
        .then((productAdded) => {
            res.json({
                productAdded:productAdded,
                id:productAdded.id
            })
        })
    }
})

routerProducts.put('/:idNumber', loginCheck, validationCheck ,(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    const productUpdate = req.body;
    if (productUpdate === undefined){res.status(400).send({error: "productUpdate no puede ser 'undefined'"})}
    else {
        products.modifyProduct(idProduct,productUpdate)
        .then(promise => res.send(promise));
    }
})

routerProducts.delete('/:idNumber', loginCheck, validationCheck ,(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    products.deleteById(idProduct)
    .then(() => res.send('Producto eliminado correctamente'))
})

routerCart.post("/", loginCheck, async (req,res)=> {
    const newCart = {
        timeStamp:Date(),
        products:[]
    }
    const newItem = await carts.save(newCart);

    res.send(await carts.getById(newItem.id))

})

routerCart.delete("/:idCart", loginCheck, (req,res)=>{
    const idCart = parseInt(req.params.idCart);
    carts.deleteById(idCart);
    res.send(`Carrito id:${idCart}, Eliminado correctamente`)
})

routerCart.get("/:idCart/productos", loginCheck, async (req,res)=>{
    const idCart = parseInt(req.params.idCart);
    const carrito = await carts.getById(idCart)
    res.send(JSON.stringify(carrito.products))
})

routerCart.post("/:idCart/productos", loginCheck, async (req,res)=>{
    const idCart = parseInt(req.params.idCart);
    const idProdToAdd = parseInt(req.body.idProdToAdd)
    if(!idProdToAdd){ res.status(400).send("idProdToAdd no puede ser undefined")}
    else {
        const productToAdd = await products.getById(idProdToAdd)
        if (!productToAdd){res.status(400).send("No hay producto para agregar con este id")}
        else{
            const thisCart = await carts.getById(idCart)
            thisCart.products.push(productToAdd)
            carts.modifyProduct(idCart,{products:thisCart.products})
            res.send(`Se añadio un producto al carrito ${idCart}`)
        }
    }
})

routerCart.delete("/:idCart/productos/:id_prod", loginCheck, async (req,res)=>{
    const idCart = parseInt(req.params.idCart);
    const idProd = parseInt(req.params.id_prod);
    const thisCart = await carts.getById(idCart)
    const newProductsList = thisCart.products.filter((prod) => prod.id !== idProd)
    carts.modifyProduct(idCart,{products:newProductsList})
    res.send(`se elimino el producto ${idProd} del carrrito ${idCart}`)
})

app.use("/api/productos",routerProducts);
app.use("/api/carrito",routerCart);

app.use((req,res) => {
    res.status(404).send("URL no Implementada")
})

app.listen(8080, () => {
    console.log("escuchado");
})
