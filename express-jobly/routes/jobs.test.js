"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
   commonBeforeAll,
   commonBeforeEach,
   commonAfterEach,
   commonAfterAll,
   u1Token,
   adminToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */
describe("POST /jobs", function () {
   const newJob = {
      title: "My Next job",
      salary: 8675309,
      equity: "0",
      companyHandle: "c1",
    };
   const badJob = {
      title: "Braniff",
      salary: 747400,
      equity: "0",
      companyHandle: "nope",
   };
   const badJobRequest = {
      title: "Bean Counter",
      salary: 747400,
      jobIWouldWant: false,
      equity: "0",
      companyHandle: "nope",
   };

   test("test happy path for creating job", async function(){
      const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toHaveProperty('id');
      expect(Number.isInteger(resp.body.id)).toBeTruthy();
      expect(resp.body.title).toEqual("My Next job")
   })
   test("not authorized to add", async function(){
      const resp = await request(app)
         .post("/jobs")
         .send(newJob)
         .set("Authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toBe(401);
   })
   test("add job with bad companyHandle", async function(){
      const resp = await request(app)
         .post("/jobs")
         .send(badJob)
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(404)
   })
   test("try with malformed JSON", async function(){
      const resp = await request(app)
         .post("/jobs")
         .send(badJobRequest)
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(400)
   })
   
   
})
describe("test get", function(){
   test("test get/find all", async function(){
      const resp = await request(app)
         .get("/jobs")
      expect(resp.statusCode).toBe(200);
      expect(resp.body.length).toBe(2);
   })
   test("test get/find one company", async function(){
      const resp = await request(app)
         .get("/jobs/1")
      expect(resp.statusCode).toBe(200);
      expect(resp.body.length).toBe(1);
      expect(resp.body[0].id).toBe(1);
   })
   test("test search for company that doesn't exist", async function(){
      const resp = await request(app)
         .get("/jobs/0") //never will a job exist with id of zero
      expect(resp.statusCode).toBe(404);
   })
   test("test get logged in (shouldn't matter)", async function(){
      const resp = await request(app)
         .get("/jobs")
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body.length).toBe(2);
   })
})

describe("test patch", function(){
   const updateExistingJob = {
      id:2,
      title: "Back-End Developer",
      salary: 190000,
      companyHandle: "c3"
    };
    const updateBadJSON = {
      id:2,
      title: "Back-End Developer",
      position: "remote",
      salary: 190000,
      companyHandle: "c3"
    };
    const updateBadJSON2 = {
      id:2,
      title: "Back-End Developer",
      salary: 190000,
      companyHandle: "c1"
    };
   test("test happy path patch update", async function(){
      const resp = await request(app)
         .patch("/jobs/2")
         .send(updateExistingJob)
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body.title).toEqual('Back-End Developer');

   })
   test("test malformed json", async function(){
      const resp = await request(app)
         .patch("/jobs/2")
         .send(updateBadJSON)
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(400);
      expect(resp.body[0].message).toMatch(/position/);
   })
   test("attempt to update companyHandle", async function(){
      const resp = await request(app)
         .patch("/jobs/2")
         .send(updateBadJSON2)
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(400);
      expect(resp.body).toMatch(/ID or company handle/)
   })
   test("attempt without being admin", async function(){
      const resp = await request(app)
         .patch("/jobs/2")
         .send(updateExistingJob)
         .set("Authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toBe(401);
   })
})
describe("test delete job", function(){
   test("happy path for delete", async function(){
      const resp = await request(app)
         .delete("/jobs/2")
         .set("Authorization", `Bearer ${adminToken}`);
      expect(resp.statusCode).toBe(200);
   })
   test("attempt delete without admin", async function(){
      const resp = await request(app)
         .delete("/jobs/2")
         .set("Authorization", `Bearer ${u1Token}`);
      expect(resp.statusCode).toBe(401);
   })
})