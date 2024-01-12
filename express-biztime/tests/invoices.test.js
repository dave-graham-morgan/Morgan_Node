process.env.NODE_ENV = 'test'

const request = require("supertest")
const app = require("../app")
const db = require("../db")

beforeAll(async()=>{
   await db.query("DELETE FROM invoices");
   await Promise.all([db.query("INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) VALUES ('apple', 100, false, '2024-01-10', null)"), 
   db.query("INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) VALUES ('ibm', 10050, false, '2024-01-10', null)"),
   db.query("INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) VALUES ('apple', 40000, true, '2024-01-10', '2024-01-10')")])

})

afterAll(async()=>{
   await db.end();
})


let id;
describe("get /", ()=>{
   test("get invoices", async ()=>{
      const res = await request(app).get("/invoices");
      expect(res.statusCode).toBe(200);
      id = (res.body[0].id)
   })
})

describe("get with id /", ()=>{
   test("get invoices", async ()=>{
      const res = await request(app).get(`/invoices/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
   })
   test('404 if not found', async()=>{
      const res = await request(app).get('/invoices/0');//no such ID
      expect(res.statusCode).toBe(404);
   })
})