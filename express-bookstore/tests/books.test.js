process.env.NODE_ENV = 'test'

const request = require("supertest")
const app = require("../app")
const Book = require("../models/book")
const db = require("../db")

afterAll(async()=>{
   await db.end();
})
// isbn,
//             amazon_url,
//             author,
//             language,
//             pages,
//             publisher,
//             title,
//             year) 
beforeEach(async()=>{
   await db.query("DELETE FROM books");
   const testBook = {"data":{"isbn":"40392023",
                              "amazon_url":"http://amazon.com/403002394",
                              "language": "English",
                              "pages": 293,
                              "publisher":"Random House",
                              "title":"Mr. Midshipman Hornblower",
                              "year":1967}}
   const book = await Book.create(testBook.data);
})

describe("get books/", ()=>{
   test("get all books", async()=>{
      const res = await request(app).get("/books");
      expect(res.statusCode).toBe(200);
      expect(res.body.books.length).toBe(1);
   })
   test("get a single book", async()=>{
      const res = await request(app).get("/books/40392023")
      console.log(res);
      expect(res.statusCode).toBe(200);
      expect(res.body.book.isbn).toEqual("40392023");
   })
})

describe("add new books to db",()=>{
   test("add a book successfully", async()=>{
      const testBook2 = {"data":{"isbn":"4055444",
                              "amazon_url":"http://amazon.com/4055444",
                              "language": "French",
                              "pages": 402,
                              "publisher":"Trafalger Press",
                              "title":"Count of Monte Cristo",
                              "year":1863}} 
      const res = await request(app).post("/books").send(testBook2.data);
      expect(res.statusCode).toBe(200);
   })
})