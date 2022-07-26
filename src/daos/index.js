const DaoFileCarts = require("./carts/DaoFileCarts");
const DaoMemoryCarts = require("./carts/DaoMemoryCarts");
const DaoMongoDbCarts = require("./carts/DaoMongoDbCarts");
const DaoFirebaseCarts = require("./carts/DaoFirebaseCarts");

const DaoFileProducts = require ("./products/DaoFileProducts");
const DaoMemoryProducts = require ("./products/DaoMemoryProducts");
const DaoMongoDbProducts = require ("./products/DaoMongoDbProducts");
const DaoFirebaseProducts = require ("./products/DaoFirebaseProducts");

let containerToExportProduct = "";
let containerToExportcart = "";

switch(process.env.DATA_BASE_PRODUCTS){
  case "fs": containerToExportProduct = DaoFileProducts;
  break;
  case "memory": containerToExportProduct = DaoMemoryProducts;
  break;
  case "mongoDb": containerToExportProduct = DaoMongoDbProducts;
  break;
  case "firebase": containerToExportProduct = DaoFirebaseProducts;
  break;
}

switch(process.env.DATA_BASE_CARTS){
  case "fs": containerToExportcart = DaoFileCarts;
  break;
  case "memory": containerToExportcart = DaoMemoryCarts;
  break;
  case "mongoDb": containerToExportcart = DaoMongoDbCarts;
  break;
  case "firebase": containerToExportcart = DaoFirebaseCarts;
  break;
}

const DaoProduct = containerToExportProduct
const DaoCart = containerToExportcart

module.exports=  {DaoProduct, DaoCart}