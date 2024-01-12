process.env.NODE_ENV = 'test'

const request = require("supertest")
const app = require("../app")
const db = require("../db")

afterAll(async()=>{
   await db.end();
})

beforeEach(async ()=>{
   await db.query("DELETE FROM companies");
   await Promise.all([db.query("INSERT INTO companies (code, name, description) VALUES ('apple', 'Apple Computer', 'Maker of OSX')"),
                     db.query("INSERT INTO companies (code, name, description) VALUES ('ibm', 'Internal Business Machines', 'Big blue')")])

})

describe("test get / ", ()=>{
   test("testing geting companies", async()=>{
      
      const res = await request(app).get("/companies");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
   })
})
describe("test get /code ", ()=>{
   test("testing geting companies", async()=>{
      
      const res = await request(app).get("/companies/apple");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].code).toEqual('apple')
   })
})

describe("test post/", ()=>{
   test("test adding a company", async()=>{
      const newCompany = {"code":"HP", "name":"Hewlett Packard", "description":"Another has-been company"}
      const res = await request(app).post("/companies").send(newCompany);
      expect(res.statusCode).toBe(201);
      expect(res.body.company.code).toEqual("HP");
      expect(res.body.company.name).toEqual("Hewlett Packard");
      expect(res.body.company.description).toEqual("Another has-been company");

   })
})

describe("test put", ()=>{
   test("testing updating a company", async()=>{
      const updatedApple = {"code":"apple", "name":"the big Apple", "description": "Shiney Phone Makers"}
      const res = await request(app).put("/companies/apple").send(updatedApple); 
      expect(res.statusCode).toBe(200);
      expect(res.body[0].code).toEqual("apple");
      expect(res.body[0].name).toEqual("the big Apple");
      expect(res.body[0].description).toEqual("Shiney Phone Makers");
   })
   test("test put with bad code", async()=>{
      const updatedBadCompany = {"code":"notReal", "name":"fake", "description": "faux company for testing"};
      const res = await request(app).put("/companies/updatedBadCompany").send(updatedBadCompany);
      expect(res.statusCode).toBe(404);
   })
})

describe("test delete", ()=>{
   test("delete a company", async()=>{
      let resGet = await request(app).get('/companies')
      expect(resGet.body.length).toBe(2)
      const resDelete = await request(app).delete('/companies/apple')
      expect(resDelete.statusCode).toBe(200)
      expect(resDelete.body.status).toEqual("deleted")
      resGet = await request(app).get('/companies')
      expect(resGet.body.length).toBe(1)
   })
   test("attempt to delete company that doesn't exist", async()=>{
      const res = await request(app).delete('/companies/googleplex')
      expect(res.statusCode).toBe(404)
   })
})