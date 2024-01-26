const express = require("express");
const router = new express.Router();
const slugify = require('slugify');

const db = require("../db")

const ExpressError = require("../expressError");
const { on } = require("events");

router.get("/", async (req,res)=>{
   const resCompanies = await db.query("SELECT * FROM companies")

   res.json(resCompanies.rows)
})

router.get("/:code", async (req,res,next)=>{
   try{
      const results = await db.query(`
      SELECT c.code, c.name, c.description, i.industry
      FROM companies c
      LEFT JOIN companies_industries ci on
      c.code = ci.comp_code
      LEFT JOIN industries i on
      i.code = ci.ind_code
      WHERE c.code=$1`,[req.params.code])
      const {code, name, description } = results.rows[0];
      const industries = results.rows.map((x)=>{
         return x.industry
      })
      const result = {code, name, description, industries}
      if (results.rows.length === 0){
         throw new ExpressError(`couldf not find company with code ${req.params.code}`,404)
      }else{
         return res.json(result)
      }
   }catch(e){
      next(e)
   }
   
})



router.post("/", async (req, res, next)=>{
   try{
      const {code, name, description } = req.body;
      const slugifedCode = slugify(code);
      const results = await db.query(`INSERT INTO companies (code, name, description) 
                        VALUES ($1, $2, $3)
                        RETURNING *`, [slugifedCode, name, description]);
      return res.status(201).json({company: results.rows[0]})
   }catch(e){
      next(e)
   }
})


router.put("/:code", async (req,res,next)=>{
   try{
      const {code, name, description } = req.body;
      const results = await db.query(`UPDATE companies
                                      SET code = $1, name = $2, description = $3
                                      WHERE code=$4
                                      RETURNING *`,[code, name, description, code])
      if (results.rows.length === 0){
         throw new ExpressError(`System could not find company with code ${req.params.code}`,404)
      }else{
         return res.json(results.rows)
      }
   }catch(e){
      next(e)
   }
   
})

router.delete("/:code", async (req,res,next)=>{
   try{
      const results = await db.query(`DELETE FROM companies WHERE code=$1`,[req.params.code])
      if(results.rowCount ===0){
         return res.status(404).json({error: "Company not found"});
      }
      return res.json({status:"deleted"})
   }catch(e){
      next(e)
   }
   
})

module.exports = router