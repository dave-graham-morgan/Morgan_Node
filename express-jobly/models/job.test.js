"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */
//title, salary, equity, companyHandle
describe("create", function () {
   const newJob = {
     title: "Software Guru",
     salary: 225000,
     equity: 0,
     companyHandle: "c1"
   };
   const badJob = {
      title : "web guy",
      salary : 43000,
      equity : 0,
      companyHandle: "nope"
   };
 
   test("test that create works", async function () {
     let job = await Job.create(newJob);
     expect(job).toHaveProperty('id');
     expect(typeof job.id).toBe('number');
     expect(job.title).toEqual("Software Guru")
     expect(job.salary).toBe(225000);
     expect(job.equity).toEqual("0");
     expect(job.companyHandle).toEqual("c1");
 
     const result = await db.query(
           `SELECT id, title, salary, equity, company_handle as "companyHandle"
            FROM jobs
            WHERE company_handle = 'c1'`);
      let jobQuery = result.rows[0];
      expect(job).toHaveProperty('id');
      expect(typeof job.id).toBe('number');
      expect(job.title).toEqual("Software Guru")
      expect(job.salary).toBe(225000);
      expect(job.equity).toEqual("0");
      expect(job.companyHandle).toEqual("c1");
   });
   test("test bad handle", async function(){
      try{
         const fail = await Job.create(badJob);
      }catch(err){
         expect(err instanceof ExpressError).toBeTruthy();
      }
   })
 });

 describe('find', function() {
   test('findAll', async function(){
      const result = await Job.findAll();
      expect(result.length).toBe(2);
   });
   test('findOne', async function(){
      const result = await Job.findOne(1);
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].title).toEqual("Back-end Developer");
      expect(result.rows[0].salary).toBe(135000);

   })
   test('error not found', async function(){
      try{
         const result = await Job.findOne(0);
      }catch(err){
         expect(err instanceof NotFoundError).toBeTruthy();
      }      
   })
 }); 

 describe('update', function(){
   test('update all properties', async function(){
      const data = 
      {
         id : 1,
         title : "Full-stack developer",
         salary : 210000,
         equity : 1, 
         companyHandle : 'c1'
      }
      const results = await Job.update(1, data);
      expect(results.id).toBe(1);
      expect(results.title).toEqual("Full-stack developer");
      expect(results.salary).toBe(210000);
      expect(results.equity).toEqual("1");
      expect(results.companyHandle).toEqual("c1");
   })
   test('try to update id', async function(){
      const data = 
      {
         id : 2,
         title : "Full-stack developer",
         salary : 210000,
         equity : 1, 
         companyHandle : 'c1'
      }
      try{
         const results = await Job.update(1, data);
      }catch(err){
         expect(err instanceof BadRequestError).toBeTruthy();
      }
   })
   test('try to update companyHandle', async function(){
      const data = 
      {
         id : 1,
         title : "Full-stack developer",
         salary : 210000,
         equity : 1, 
         companyHandle : 'c40'
      }
      try{
         const results = await Job.update(1, data);
      }catch(err){
         expect(err instanceof BadRequestError).toBeTruthy();
      }
   })
 })
 

 describe('delete', function(){
   test('remove a single record', async function(){
      const results = await Job.remove(1);
      expect(results.id).toBe(1);
      try{
         const query2 = await Job.findOne(1);
      }catch(err){
         expect(err instanceof NotFoundError).toBeTruthy();
      }
   })
   test('attempt to remove bad record', async function(){
      try{
         const results = await Job.remove(0);
      }catch(err){
         expect(err instanceof NotFoundError).toBeTruthy();
      }
   })

 })