"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, ExpressError, NotFoundError } = require("../expressError");
const { ensureLoggedIn, requiresAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title (required), salary, equity, company_handle (required)  }
 *
 * Returns { id, title, salary, equity, company_handle}
 *
 * Authorization required: admin
 */
router.post("/", requiresAdmin, async function(req, res, next){
   try{
      const validator = jsonschema.validate(req.body, jobNewSchema);
      if (validator.errors.length !== 0) {
         const errs = validator.errors.map(e => e.message);
         throw new BadRequestError(errs);
       }
      const newJob = await Job.create(req.body);
      return res.status(201).json(newJob);
      
   }catch(err){
      if(err instanceof ExpressError){
         return res.status(err.status).json(err.message)
      }else{
         return res.status(500).send("All your base are belong to us.");
      }
      
   }
   
})
  /** Find all jobs.
   *
   * Returns [ {id, title, salary, equity, company_handle}, ...]
   * optional filters include title, minSalary and hasEquity.  system will return
   * any jobs matching these criteria.  If any of these are left off the
   * system will return all jobs. 
   * */
router.get("/", async function(req,res,next){
   try{
      const {title, minSalary, hasEquity} = req.query
      const allJobs = await Job.findAll(title, minSalary, hasEquity);
      return res.status(200).json(allJobs);
      
   }catch(err){
      return res.json(err);
   }

})
  /** Find one job by job ID.
   *
   * Returns {id, title, salary, equity, company_handle}
   * */
router.get("/:id", async function(req, res, next){
   
   try{
      const oneJob = await Job.findOne(req.params.id)
      return res.status(200).json(oneJob.rows);
   }catch(err){
      if(err instanceof NotFoundError){
         return res.status(err.status).json(err.message)
      }
      return res.json(err)
   }
   
   
})

/** PATCH /[handle] { fld1, fld2, ... } => { job }
 *
 * Patches jobs data.
 * 
 * updateable fields can be: { title, salary, equity }
 * cannot update job id or company_handle
 *
 * Returns { id, title, salary, equity, company_handle }
 *
 * Authorization required: admin
 */
router.patch("/:id", requiresAdmin, async function(req, res, next){
   try{
      const validator = jsonschema.validate(req.body, jobUpdateSchema);
      if (validator.errors.length !== 0) {
         const errs = validator.errors.map(e => {
             return {
               property : e.property,
               message: e.message
             };
         });
         throw new BadRequestError(errs);
       }
       //id is a string in params, convert to int
       const id = parseInt(req.params.id);
       if(isNaN(id)){
         throw new ExpressError("id to be updated is not a number", 400);
       }
       const newJob = await Job.update(id, req.body);
       return res.status(200).json(newJob);
   }catch(err){
      if(err instanceof BadRequestError){
         return res.status(err.status).json(err.message)
      }
      return res.json(err);
   }
})

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: admin
 */
router.delete("/:id", requiresAdmin, async function(req, res, next){
   try{
      //id is a string in params, convert to int
      const id = parseInt(req.params.id);
      if(isNaN(id)){
         throw new ExpressError("id to be deleted is not a number", 400);
      }
      const deletedJob = await Job.remove(id);
      return res.status(200).json(deletedJob);
   }catch(err){
      return res.json(err);
   }
})


module.exports = router;