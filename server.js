const express = require ("express");
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
let Contenedor = require ("./classConstructor")

const mysqlOptions = {
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "admin",
        password: "admin",
        database: "ecommerce"
    }
}

const SQLite3Options = {
    client: "sqlite3",
    connection: {
        filename:"./DB/ecommerce.sqlite"
    },
    useNullAsDefault:true
}

const productsList = new Contenedor (mysqlOptions,"products");
const messagesList = new Contenedor (SQLite3Options,"messages");

const app = express ();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine (
    "hbs",
    engine({
        extname:".hbs",
        defaultLayout:"index.hbs",
    })
)

app.set("views","./hbs_views");
app.set("view engine", "hbs");

const httpServer = new HTTPServer (app);
const io = new IOServer (httpServer);

let messages = []

// Socket Connections

io.on("connection", async (socket) => {
    messages = await messagesList.getAll();
    socket.emit("messages", messages);
    socket.emit("products", await productsList.getAll());
    
    socket.on("new_message",async (message) => {
        messages.push(message)
        await messagesList.save(message)
        io.sockets.emit("messages", messages)
    })

    socket.on("new_product", async (product) => {
        product.timeStamp = new Date();
        await productsList.save(product)
        io.sockets.emit("products", await productsList.getAll())
    })
})

app.get("/productos",(req,res)=>{
    productsList.getAll().then(products => {
        res.render("main", {products:products})
    })
})

httpServer.listen(8080, ()=> {
    console.log("Server Listening port: 8080");
})