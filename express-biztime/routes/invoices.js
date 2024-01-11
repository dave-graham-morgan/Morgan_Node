const express = require("express");
const router = new express.Router();

const ExpressError = require("../expressError")
const db = require("../db");

router.get("/", async (req,res)=>{
   const results = await db.query(`SELECT * FROM invoices`);
   res.json(results.rows);
})

router.get("/:id", async (req,res,next)=>{
   try{
      const id = req.params.id
      const results = await db.query(`SELECT * FROM invoices WHERE id=$1`,[id])
      if (results.rows.length === 0){
         throw new ExpressError(`could not find an invoice with id ${id}`,404)
      }else{
         return res.json(results.rows)
      }
   }catch(e){
      next(e)
   }
   
})

router.post("/", async (req, res, next)=>{
   try{
      const {comp_code, amt, paid, add_date, paid_date} = req.body;
      const results = await db.query(`INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) 
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *`, [comp_code, amt, paid, add_date, paid_date]);
   
      return res.json({company: results.rows[0]})
   }catch(e){
      next(e)
   }
})

router.put("/:id", async (req,res,next)=>{
   try{
      const {comp_code, amt, paid, add_date, paid_date} = req.body;
      console.log(comp_code, amt, paid, add_date, paid_date);
      const id = req.params.id
      const results = await db.query(`UPDATE invoices
                                      SET comp_code = $1, amt = $2, paid = $3, add_date=$4, paid_date=$5
                                      WHERE id = $6
                                      RETURNING *`,[comp_code, amt, paid, add_date, paid_date, id])
      if (results.rows.length === 0){
         throw new ExpressError(`could not find company with id ${id}`,404)
      }else{
         return res.json(results.rows)
      }
   }catch(e){
      next(e)
   }
   
})
router.delete("/:id", async (req,res,next)=>{
   try{
      const results = await db.query(`DELETE FROM invoices WHERE id=$1`,[req.params.id])
      if(results.rowCount ===0){
         return res.status(404).json({error: "Invoice not found"});
      }
      return res.json({status:"deleted"})
   }catch(e){
      next(e)
   }
   
})

module.exports = router