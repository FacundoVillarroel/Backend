const FirebaseContainer = require("../../containers/FirebaseContainer.js");

class DaoFirebaseProducts extends FirebaseContainer {
  constructor() {
    super("products")
  }

  async save(item){
    //idCounter no tiene que ser harcodeado
    let idCounter = 5
    const productToAdd = this.query.doc(`${idCounter}`);
    await productToAdd.create(item)

    return `Producto Agregado Correctamente, id: ${item.id}`
  }

  async getById(idNumber){   
    const productFound = await (await this.query.doc(`${idNumber}`).get()).data();
    return productFound
  }

  async getAll(){
    console.log();
    const products = await this.query.get();
    return products.docs.map(doc=> doc.data());
  }

  async modifyProduct(idNumber,productUpdate) {
    const productFound = await this.query.doc(`${idNumber}`)
    await productFound.update({...productUpdate})
    return ("Producto Modificado Correctamente")
  }

  async deleteById(idNumber){
    const productFound = await this.query.doc(`${idNumber}`)
    await productFound.delete()
  }

  async deleteAll(){
    
  }

}

module.exports = DaoFirebaseProducts;