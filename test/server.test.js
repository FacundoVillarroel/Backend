const  { expect }  = require ("chai");
const supertest = require ("supertest");

const app = require("../server.js")

const request = supertest(app)

describe("API Rest Test", () => {

  describe("Productos", () => {

    describe("Successfull Cases", () => {
      
      describe("Get All, Get By ID", () => {
        it("Should respond with the list of Products (array of objects)", async () => {
          const response = await request.get("/api/productos");
          expect(response.body).to.be.an("array").and.to.not.have.lengthOf(0).and.includes.an("object")
        })
  
        it("Should return a single object with id 1", async () => {
          const response = await request.get("/api/productos/1")
          expect(response.body).to.be.an("object").and.includes({id:1})
        })
      })
  
      describe("Put, Modify Product", () => {
        it("Should response with the updated product" , async () => {
          const productToAdd = {
            price:1350,
            stock:50
          }
          const response = await request.put("/api/productos/3").send(productToAdd)
          expect(response.body).to.include(productToAdd)
        })
        
      })
  
      describe("Post", () => {
        it("Should return the product added and its id" , async () => {
          const productToAdd = {
            title:"titulo test",
            description:"description test",
            code:"test 1",
            price:100,
            thumbnail:"req.body.thumbnail",
            stock:100
          }
          const response = await request.post("/api/productos").send(productToAdd)
          expect(response.body).to.includes(productToAdd).and.to.have.property("id")
        })
      })
  
      describe('Delete by id', () => { 
        it("Should return 'successfully deleted'", async () => {
          const response = await request.delete("/api/productos/4")
          expect(response.text).to.eq("successfully deleted")
        })
      })

    })

    describe("Error Cases:", () => {

      describe("Get By ID an Non-existent product" , () => {

        it("Should throw an error, 'No existe producto con ese id'", async () => {
          const response = await request.get("/api/productos/1000")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("No existe producto con ese id")
        })
      })

      describe("Get By Id passing a character that is not a number", () => {
        it("Should throw an error 'El ID debe ser un numero'", async () => {
          const response = await request.get("/api/productos/notANumber")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("El ID debe ser un numero")
        })
      })
    })
  })
})
