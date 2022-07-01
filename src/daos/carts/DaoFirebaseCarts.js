const FirebaseContainer = require("../../containers/FirebaseContainer.js");

class DaoFirebaseCarts extends FirebaseContainer {
  constructor() {
    super("carts");
  }

  async getById (id){
    const cartFound = await (await this.query.doc(`${id}`).get()).data();
    return cartFound;
  }

  async save (item){
    let idCounter = 3;
    const cartToAdd = this.query.doc(`${idCounter}`);
    await cartToAdd.create(item)
    
  }

  async deleteById (id){
    const cartFound = await this.query.doc(`${id}`)
    await cartFound.delete()
  }

  async addProductToCart (id, productToAdd){
    const data = await (await this.query.doc(`${id}`).get()).data();
    const cartToUpdate = await this.query.doc(`${id}`);
    productToAdd.id = 3;
    const newProductsList = [...data.products, productToAdd]
    await cartToUpdate.update({products: newProductsList})
  }

  async deleteProductFromCart (id, idProd){
    const data = await (await this.query.doc(`${id}`).get()).data();
    const cartToUpdate = await this.query.doc(`${id}`);
    const newProductsList = data.products.filter(prod => prod.id !== idProd)
    await cartToUpdate.update({products: newProductsList})
  }

}

module.exports = DaoFirebaseCarts;

