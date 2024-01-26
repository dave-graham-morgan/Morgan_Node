"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, ExpressError } = require("../expressError");
const { ensureLoggedIn, requiresAdmin } = require("../middleware/auth");
const Company = require("../models/company");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

router.post("/", requiresAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  //in hindsight, this filtering logic should absolutely be in the model and not here. This should be first up for refactoring
  try {
    //check the query string to see if user is filtering by name, min or max employees or any combination
    const {name, minEmployees, maxEmployees} = req.query
    console.log(`top of the batting order: ${name}, ${minEmployees}, ${maxEmployees}`)
    let queryParams = [];
    let companies;
    
    //if there are query strings push each onto the queryParams array
    if(name){
      queryParams.push(`name ILIKE '%${name}%'`)
    }
    let min;
    if(minEmployees){
      //convert to int so we can make a logical comparison
      min = parseInt(minEmployees)
      if(Number.isNaN(min)){
        throw new ExpressError("Min must be a number", 400)
      }
      queryParams.push(`num_employees >= ${min}`)
    }
    let max;
    if(maxEmployees){
      //convert to int so we can make a logical comparison
      max = parseInt(maxEmployees)
      if(Number.isNaN(max)){
        throw new ExpressError("Max must be a number", 400)
      }
      queryParams.push(`num_employees <= ${max}`)
    }
    //quick check to ensure min max isn't screwed up
    //this will resolve to false if either min or max are NaN
    if(min >= max){
      throw new ExpressError("min must be less than max employees", 400)
    }

    //if we found query parameters, build the where clause and query db
    if(queryParams.length > 0){
      const queryString = `WHERE ` + queryParams.join(' AND ');
      companies = await Company.findWithWhere(queryString);
    //if there aren't query parameters, just find all companies
    }else{
      companies = await Company.findAll();
    }
  
    return res.json({ companies });

  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  try {
    const company = await Company.get(req.params.handle);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login
 */

router.patch("/:handle", requiresAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const company = await Company.update(req.params.handle, req.body);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: admin
 */

router.delete("/:handle", requiresAdmin, async function (req, res, next) {
  try {
    await Company.remove(req.params.handle);
    return res.json({ deleted: req.params.handle });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
