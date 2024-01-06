process.env.NODE_ENV = "test";

const request = require("supertest")
const app = require("./app")
const items = require("./fakeDb.js")

let gum = {"name":"gum", "price":"2.45"}

beforeEach(function() {
   items.length = 0;
   items.push(gum);
})

afterEach(function() {
   items.length = 0;
})

describe("get / items", () => {
   test("getting items", async()=>{
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual([gum])
   })
   test("get item by name", async()=>{
      const res = await request(app).get("/items/gum");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual(gum)
   })
   test("get 404 with invalid name", async()=>{
      const res = await request(app).get("/items/fakename");
      expect(res.statusCode).toBe(404)
   })
})

describe("post a new item", ()=>{
   test("add a new item", async ()=>{
      let candy = {"name":"candy", "price":"2.00"}
      let res = await request(app).post("/items").send(candy);
      expect(res.statusCode).toBe(201)
      res = (await request(app).get("/items"));
      expect(res.body.length).toBe(2);
   })
})
describe("test patching", ()=>{
   test("change name of existing item", async ()=>{
      let res = (await request(app)
                  .patch(`/items/${gum.name}`)
                  .send({"name":"bubblicious"}))
      expect(res.statusCode).toBe(200)
      expect(res.body.name).toEqual("bubblicious");
      res = await request(app).get("/items");
      expect(res.body.length).toBe(1);
      
   })
   test("change price of existing item", async()=>{
      let res = await request(app)
                        .patch(`/items/${gum.name}`)
                        .send({"price":"4.14"})
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toEqual("4.14")
      res = await request(app).get("/items");
      expect(res.body.length).toBe(1);
   })
   test("change both price and name of existing item", async()=>{
      let res = await request(app)
                  .patch(`/items/${gum.name}`)
                  .send({"name":"starburst", "price": "8.00"})
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toEqual("starburst");
      expect(res.body.price).toEqual("8.00");
      res = await request(app).get("/items");
      expect(res.body.length).toBe(1);
   })
   test("we should get a 404 for invalid name", async()=>{
      const res = await request(app).patch("/items/fakename");
      expect(res.statusCode).toBe(404);
   })
})
describe("test delete ", ()=>{
   test("delete existing item", async()=>{
      let res = await request(app).delete(`/items/${gum.name}`)
      expect(res.statusCode).toBe(200);
      res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(0);
   })
   test("we should get 404 for invalid name", async ()=>{
      const res = await request(app).delete("/items/fakename");
      expect(res.statusCode).toBe(404);
   })
})