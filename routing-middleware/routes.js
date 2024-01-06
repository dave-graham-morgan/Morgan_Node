const express = require("express");
const router = new express.Router();
const items = require("./fakeDb.js")
//const app = require("./app.js")
const ExpressError = require("./expressError.js")

router.get("/", (req, res)=> {
   return res
   .status(200)
   .send(items)
})

router.get("/:itemName", (req, res, next)=> {
   const item = items.find((item) => item.name === req.params.itemName)

   if(item === undefined){
      return next(new ExpressError("Item Not Found", 404))
   }else{
      return res
         .status(200)
         .send(item)
   }
   
})

router.post("/", (req, res)=>{
   global.items.push(req.body)
   console.log(global.items)
   return res
      .status(201)
      .json({added:req.body})
})

router.patch("/:itemName", (req, res, next)=> {
   const item = items.find((item) => item.name === req.params.itemName)
   if(item === undefined){
      return next(new ExpressError("Item Not Found", 404))
   }
   if(req.body.name){
      item.name = req.body.name;
   }
   if(req.body.price){
      item.price = req.body.price;
   }
   return res
      .status(200)
      .send(item)
})

router.delete("/:name", (req, res, next)=>{
   const itemIndex = items.findIndex((item) => item.name === req.params.name)
   
   if(itemIndex === -1){
      return next(new ExpressError("Item no lococomodo", 404))
   }else{
      items.splice(itemIndex,1)
   }
   return res
      .status(200)
      .json({"message":"Item deleted"})

})

module.exports = router;