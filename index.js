const express = require('express');
const app = express();
let Contenedor = require ("./classConstructor")

const products = new Contenedor ("products.txt");
products.prevContent();

const routerProducts = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

routerProducts.get('/',(req,res) => {
    products.getAll().then(allproducts => {
        res.send(allproducts)
    })
})

routerProducts.get('/:idNumber',(req,res) => {
    const idProduct = parseInt(req.params.idNumber)
    products.getById(idProduct)
    .then((productFound) => {
        if (!productFound) res.status(404).send({error:"producto no encontrado"})
        else res.json(productFound)
    })
})

routerProducts.post('/',(req,res) => {
    const productToAdd = {
        title:req.body.title,
        price:parseInt(req.body.price),
        thumbnail:req.body.thumbnail
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

routerProducts.put('/:idNumber',(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    const productUpdate = req.body.productUpdate;
    if (productUpdate === undefined){res.status(400).send({error: "productUpdate no puede ser 'undefined'"})}
    else {
        products.modifyProduct(idProduct,productUpdate)
        .then(promise => res.send(promise));
    }
})

routerProducts.delete('/:idNumber',(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    products.deleteById(idProduct)
    .then(() => res.send('Producto eliminado correctamente'))
})

app.use('/api/productos', routerProducts);


app.listen(8080, () => {
    console.log('Estoy escuchando!');
})