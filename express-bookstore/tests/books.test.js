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
                              "author":"Nathanial Hawthorne",
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
      expect(res.statusCode).toBe(200);
      expect(res.body.book.isbn).toEqual("40392023");
   })
})

describe("add new books to db",()=>{
   test("add a book successfully", async()=>{
      const testBook2 = {"book":{"isbn":"4055444",
                              "amazon_url":"http://amazon.com/4055444",
                              "language": "French",
                              "author":"Alexendre Dumas",
                              "pages": 402,
                              "publisher":"Trafalger Press",
                              "title":"Count of Monte Cristo",
                              "year":1863}} 
      const res = await request(app).post("/books").send(testBook2);
      expect(res.statusCode).toBe(201);
      expect(res.body.book.isbn).toBe('4055444');
      expect(res.body.book.language).toBe('French');
   })
   test('add a book with malformed JSON', async()=>{
      const noLanguage = {"book":{"isbn":"400115",
                           "amazon_url":"http://amazon.com/4055444",
                           "author":"Alexendre Dumas",
                           "pages": 402,
                           "publisher":"Trafalger Press",
                           "title":"Count of Monte Cristo",
                           "year":1863}} 
      const res  = await request(app).post("/books").send(noLanguage);
      expect(res.statusCode).toBe(400)
      let response = JSON.parse(res.text);
      let errorMessage = response.error.message[0];
      expect(response.error.message[0]).toMatch(/instance.book requires property \"language\"/);
   })
})