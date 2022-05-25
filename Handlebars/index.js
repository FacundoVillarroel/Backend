const express = require("express");
const { engine } = require ("express-handlebars");
const app = express()
let Contenedor = require ("./classConstructor")

const allProducts = new Contenedor ("products.txt");
allProducts.prevContent();

const routerProducts = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.engine (
    "hbs",
    engine({
        extname:".hbs",
        defaultLayout:"index.hbs",
    })
)

app.set("views","./hbs_views");
app.set("view engine", "hbs");


app.get("/",(req,res) => {
    res.render("main")
})

routerProducts.get('/',(req,res) => {
    allProducts.getAll().then(products => {
        res.render("products", {products:products})
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
        allProducts.save(productToAdd)
        .then((productAdded) => {
            res.redirect("/")
        })
    }
})

routerProducts.delete('/:idNumber',(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    allProducts.deleteById(idProduct)
    .then(() => res.send('Producto eliminado correctamente'))
})


app.use('/productos', routerProducts);

app.listen(8080, () => {
    console.log("Server Listening");
})