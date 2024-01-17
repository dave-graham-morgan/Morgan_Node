const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const ExpressError = require("../expressError");
const db = require("../db");
const {SECRET_KEY} = require("../config")
const User = require('../models/user')




/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) =>{
   try{
      const {username, password} = req.body;
      const results = await db.query(`SELECT username, password FROM users WHERE username = $1`,[username])
      const user = results.rows[0];
      let token;
      if(await bcrypt.compare(password,user.password)){
         User.updateLoginTimestamp(username); //update login timestamp
         let payload = {"username":username}
         token = jwt.sign(payload, SECRET_KEY)
         return res.json({token});
      }else{
         raise
      }

   }catch(e){
      const err = new ExpressError("invalid username/ password", 401);
      next(err);
   }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) =>{
   const {username, password, first_name, last_name, phone} = req.body;
   if(!username || !password || !first_name || ! last_name ||!phone){
      return next(new ExpressError(`username, password, first and last name and phone are all required`, 422))
   }
   const results = await User.register({username, password, first_name, last_name, phone});
   if(Object.keys(results).length === 0){
      return next(new ExpressError(`Registration failed, try again`, 500))
   }else{
      User.updateLoginTimestamp(username); //when refactoring, consider calling login here instead of redoing
      const payload = {username};
      token = jwt.sign(payload, SECRET_KEY);
      return res.json({token});
   }
   
})

module.exports = router;