const Contenedor = require("./classConstructor")
const express = require("express");
const app = express();

const products = new Contenedor ("products.txt");

async function randomProduct () {
    try{   
        const allProducts = await products.getAll()
        const randomId = Math.floor(Math.random() * allProducts.length+1);
        return (allProducts.find(prod => prod.id === randomId))
    } catch (err) {
        console.error(err)
    }
}


app.get("/",(req,res) => {
    res.send('<a href="/productos"> Productos</a> <br> <a href="/productoRandom"> Producto Random</a>')
})

app.get("/productos",(req,res) => {
    products.getAll().then((products) => {
        res.send(products)
    }) 
})

app.get("/productoRandom", (req,res) => {
    randomProduct().then((product) => {
        res.send(product)
    })
})

app.listen(8080,() => {
    console.log("Servidor levantado");
})
