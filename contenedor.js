const { error } = require("console");
const fs = require ("fs")

class Contenedor {
    static idCounter = 1

    constructor(fileName){
        this.fileName="./public/"+fileName;
        this.array= []
    }

    async loadPrevContent (){
        try{
            this.array = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            let lastIdNumber = this.array[this.array.length -1].id
            Contenedor.idCounter = lastIdNumber+1;
        }
        catch(err){
            this.array = [];
        }
    }

    async save(item){
        item.id = Contenedor.idCounter;
        item.timeStamp = new Date();
        this.array.push(item)
        Contenedor.idCounter ++
        try{
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.array,null,2));
            return(item)
        }
        catch (err) {
            console.log("Error en escritura;",err);
        } 
    }

    async getById(idNumber){   
        try{
            const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            let itemFound = contenido.find((prod) => prod.id === idNumber)
            if (itemFound === undefined){
                itemFound = null
            }
            return(itemFound);
        }
        catch(err){
            console.error("Error en la búsqueda del producto",err);
        }
    }

    async getAll(){
        try{
            const allProducts = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            return(allProducts);
        }
        catch(err){
            console.log("Error en la obtención de productos",err);
        }
    }

    async modifyProduct(idNumber,productUpdate) {
        try{
            const oldProduct = await this.getById(idNumber)
            const newProduct = {...oldProduct, ...productUpdate}
            const productIndex = this.array.findIndex((product) => product.id === idNumber)
            this.array.splice(productIndex,1,newProduct)
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.array,null,2));
            return ("Actualizado correctamente")
        }
        catch(err){
            return new error("Error en la actualización",err);
        }
    }

    async deleteById(idNumber){
        try{
            this.array = this.array.filter((prod) => prod.id !== idNumber)
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.array,null,2)) 
            console.log("Nueva lista",this.array);
        }
        catch(err){
            console.log("Error al eliminar",err);
        }
    }

    async deleteAll(){
        try{
            this.array = []
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.array))
            console.log("Productos Eliminados");
        }
        catch(err){
            console.log("Error al eliminar todos los productos",err);
        }

    }
}

module.exports = Contenedor