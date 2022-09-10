const {DaoProduct} = require ("../src/daoToExport");
const {Product} = require("./product")
const products = new DaoProduct();
const logger = require("../logs/logger")

const getAllProducts = async () => {
  try{
    return (await products.getAll())
  }catch(err){
    logger.error(`Error: ${err}`)
  }
}

const getProduct = async (id) => {
  try{
      const prodFound = await products.getById(id)
      if (prodFound) {
        return prodFound
      } else {
        return function(){throw new Error("No existe producto con ese ID")}
      }
    }
  catch (err){
    logger.error(`Error: ${err}`)
  }
}

const postProduct = async (productToAdd) => {
  try{
    productToAdd.timeStamp = new Date();
    const newProduct = new Product(productToAdd)
    return (await products.save(newProduct))
  } catch (err){
    logger.error(`Error: ${err}`)
  }
}

const putProduct = (id, productUpdate) => {
  try{
    products.modifyProduct(id,productUpdate)
      .then(promise => {return promise});
  } catch (err){
    logger.error(`Error: ${err}`)
  }
}

const deleteProduct = (id) => {
  try{
    products.deleteById(id)
    .then(() => {return('Producto eliminado correctamente')})
  } catch {
    logger.error(`Error: ${err}`)
  }
}

module.exports = { getAllProducts, getProduct, postProduct, putProduct, deleteProduct}