const DaoFileProducts = require ("./DaoFileProducts");
const DaoMemoryProducts = require ("./DaoMemoryProducts");
const DaoMongoDbProducts = require ("./DaoMongoDbProducts");
const DaoFirebaseProducts = require ("./DaoFirebaseProducts");

class ProductDaoFactory{
  create(type) {
    switch(type){
      case "fs": return new DaoFileProducts();
      case "memory": return new DaoMemoryProducts();
      case "mongoDb": return new DaoMongoDbProducts();
      case "firebase": return new DaoFirebaseProducts();
    }
  }
}

module.exports = {ProductDaoFactory}