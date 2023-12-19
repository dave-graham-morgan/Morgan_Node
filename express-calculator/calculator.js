const express = require('express');
const ExpressError = require('./errors')

const app = express();

app.get('/mean', (req, res, next) => {
   let numsArray = req.query.nums.split(',').map(Number)
   let sum = 0
   for (let i = 0; i<numsArray.length; i++){
      sum = sum + numsArray[i];
   }
   let mean = sum / numsArray.length
   if (!mean){
      res.send("sorry that isn't a number")
      throw new ExpressError("Not a numasdfasdfber", 404)
   }
   console.log(`unsorted array: ${numsArray}`)
  numsArray.sort()
   console.log(`sorted: ${numsArray}`)
   console.log(mean)
   
   return res.json(`"response":{"operation":"mean", "value":"${mean}"}`)
}) 
app.get("/mode", (req, res, next) => {
   res.send("you selected mode")
})

app.get("/median", (req, res, next)=> {
   let numsArray = req.query.nums.split(',').map(Number)
   numsArray.sort();
   let middle = Math.floor(numsArray.length/2)
   let median = numsArray[middle]
   return res.status(200).send(`the median is: ${median}`)
})

app.listen(8080, function(){
   console.log('App on port 8080');
})

