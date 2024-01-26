"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job{
   /** Create a job (from data), update db, return new job data.
   *
   * data should be {title, salary, equity, company_handle(fk)}
   *
   * Returns {id, title, salary, equity, company_handle}
   * throws NotFoundError if request has bad company_handle
   * */

   static async create({title, salary, equity, companyHandle}){
      
      const existingCompany = await db.query(`
         SELECT * FROM companies
         WHERE handle = $1`,
         [
            companyHandle
         ]);
      if (existingCompany.rows.length === 0) {
         throw new ExpressError(`Company handle ${companyHandle} not found`, 404);
      }
      
      const result = await db.query(
         `INSERT INTO jobs 
         (title, salary, equity, company_handle)
         VALUES ($1, $2, $3, $4)
         RETURNING id, title, salary, equity, company_handle as "companyHandle"`,
         [
            title, salary, equity, companyHandle
         ]);
      const job = result.rows[0];
      return job;
   }

   /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, companyHandle}, ...]
   * */
   static async findAll(title, minSalary, hasEquity){
      //clean up the job title
      let cleanTitle = title || '';

      //clean up minSalary
      let cleanSalary = parseInt(minSalary, 10);
      if(isNaN(cleanSalary)){
         cleanSalary = 0;
      }

      let queryBuidler = `SELECT id, title, salary, equity, company_handle as "companyHandle"
                              FROM jobs
                              WHERE title ILIKE $1
                              AND salary >= $2`;

      const queryParams = [`%${cleanTitle}%`, cleanSalary];

      if(hasEquity){
         queryBuidler += ` AND equity is NOT NULL`
      }
      queryBuidler +=  ` ORDER BY id`
      console.log(`queryParams = ${queryParams}; queryBuilder = ${queryBuidler}`)
   
      const result = await db.query(queryBuidler, queryParams);
      if(result.rows.length === 0) throw new NotFoundError(`No jobs found`)
      return result.rows;
   }

   /** Given a job id, return data about that job.
   *
   * Returns { id, title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   **/
   static async findOne(id){
      const result = await db.query(`
         SELECT id, title, salary, equity, company_handle as "companyHandle"
         FROM jobs
         WHERE id = $1`,
      [
         id
      ]);

      if(result.rows.length === 0) throw new NotFoundError(`No job: ${id}`)
      return result;
   }
   static async update(id, data){
      const { setCols, values } = sqlForPartialUpdate(
         data,
         {
           companyHandle: "company_handle"
         });
      const jobExists = await db.query(`
         SELECT id, company_handle as "companyHandle"
         FROM jobs
         WHERE id = $1`,
         [
            id
         ]);
      
      if(jobExists.rows.length === 0) throw new NotFoundError(`Job not found. ID: ${id}`)
      if(data.id !== id || data.companyHandle !== jobExists.rows[0].companyHandle){
         throw new BadRequestError(`Cannot update ID or company handle`)
      }
 
      
      const handleVarIdx = "$" + (values.length + 1);
      const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity, 
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0]
    if (!job) throw new NotFoundError(`No Job: ${id}`);
    return job;
   }

   /** Delete given job from database; returns id of deleted record.
   *
   * Throws NotFoundError if job not found.
   **/
   static async remove(id){
      const results = await db.query(`
         DELETE FROM jobs
         WHERE id = $1
         RETURNING id`,
         [
            id
         ]);
      const deletedJobID = results.rows[0]
      if (!deletedJobID) throw new NotFoundError(`No Job: ${id}`)

      return deletedJobID;
   }
   
}
module.exports = Job;