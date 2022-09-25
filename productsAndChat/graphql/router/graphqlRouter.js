const fs = require("fs")
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const {getAll, getById, modifyProduct, addProduct, deleteById} = require("../controller/resolver")
const express = require("express")
const { Router } = express


const schemaString = fs.readFileSync("./productsAndChat/graphql/schemas/product.gql").toString()
const compiledSchema = buildSchema(schemaString)

const graphMiddleware = graphqlHTTP({
    schema: compiledSchema,
    rootValue: {
        getAll:getAll,
        getById: getById,
        modifyProduct:modifyProduct,
        addProduct:addProduct,
        deleteById:deleteById
    },
    graphiql:true,
})

const graphqlRouter = Router()
graphqlRouter.use("/graphql", graphMiddleware)

module.exports = graphqlRouter
