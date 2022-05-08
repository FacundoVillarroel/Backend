const fs = require ("fs")

class Contenedor {
    static contadorId = 1

    constructor(fileName){
        this.fileName=fileName;
        this.arrayProducts= []
    }

    async prevContent (){
        try{
            this.arrayProducts = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            let lastIdNumber = this.arrayProducts[this.arrayProducts.length -1].id
            Contenedor.contadorId = lastIdNumber+1
            console.log("Contenido previo cargado correctamente");
        }
        catch(err){
            this.arrayProducts = []
            console.log("no existe un contenido previo");
        }
    }

    async save(item){
        item.id = Contenedor.contadorId;
        this.arrayProducts.push(item)
        Contenedor.contadorId ++
        try{
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts,null,2));
            console.log("Producto Agregado");
            return(item.id)
        }
        catch (err) {
            console.log("Error en escritura;",err);
        } 
    }

    async getById(idNumber){   
        try{
            const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
            let productFound = contenido.find((prop) => prop.id === idNumber)
            if (productFound === undefined){
                productFound = null
            }
            return(productFound);
        }
        catch(err){
            console.log("Error en la búsqueda del producto",err);
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

    async deleteById(idNumber){
        try{
            this.arrayProducts = this.arrayProducts.filter((prod) => prod.id !== idNumber)
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts,null,2)) 
            console.log("Nueva lista de productos",this.arrayProducts);
        }
        catch(err){
            console.log("Error al eliminar un producto",err);
        }
    }

    async deleteAll(){
        try{
            this.arrayProducts = []
            await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts))
            console.log("Productos Eliminados");
        }
        catch(err){
            console.log("Error al eliminar todos los productos",err);
        }

    }
}

module.exports = Contenedor