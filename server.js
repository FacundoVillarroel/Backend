const express = require ("express");

const app = express ();

const { productRouter } = require ("./routers/productRouter");
const { cartRouter } = require ("./routers/cartRouter");

app.use(express.static("public"));
app.use(express.json());


app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use( function (req, res) {
    res.send({Error: `ruta ${req.originalUrl} metodo ${req.method} No implementado`})
})

app.listen(8080, ()=> {
    console.log("Server Listening port: 8080");
})