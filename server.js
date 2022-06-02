const express = require ("express");
const fs = require ("fs")
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
let Contenedor = require ("./classConstructor")

const productsList = new Contenedor ("products.txt");
productsList.prevContent();

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

// functions to write and read files

const writeFile = async (fileName, array) => {
    try {
        await fs.promises.writeFile(`${fileName}`, JSON.stringify(array))
    } catch {
        throw new Error('Problem with the writing of the file')
    }
}

const readFile = async (fileName) => {
    try {        
        const itExists = fs.existsSync(fileName)
        if(itExists) {
            return JSON.parse(await fs.promises.readFile(fileName));
        } else {
            return []
        }
    } catch {
        throw new Error('Problem with getting the array out of the file')
    }
}

let messages = []
// Socket Connections

io.on("connection", async (socket) => {
    messages = await readFile("./public/messages.txt")
    socket.emit("messages", messages);
    socket.emit("products", await productsList.getAll());
    
    socket.on("new_message",(message) => {
        console.log("1",messages);
        messages.push(message);
        console.log("2",messages);
        writeFile('./public/messages.txt', messages)
        console.log("3",messages);
        io.sockets.emit("messages", messages)
    })

    socket.on("new_product", async (product) => {
        await productsList.save(product)
        io.sockets.emit("products", await productsList.getAll())
    })
})

app.get("/productos",(req,res)=>{
    productsList.getAll().then(products => {
        res.render("main", {products:products})
    })
})

/* app.delete('/:idNumber',(req,res) => {
    const idProduct = parseInt(req.params.idNumber);
    productsList.deleteById(idProduct)
    .then(() => res.send('Producto eliminado correctamente'))
}) */

httpServer.listen(8080, ()=> {
    console.log("Server Listening port: 8080");
})