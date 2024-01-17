const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const Message = require("../models/message")
const {ensureLoggedIn} = require("../middleware/auth")
const User = require("../models/user")

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async (req, res, next) =>{
   try{
      const loggedInUsername = req.user.username;
      const message = await Message.get(req.params.id)

      if (loggedInUsername === message.from_user.username || loggedInUsername === message.to_user.username){
         return res.json({"message":message})
      }
      throw new ExpressError("Unauthorized Request... douche", 401)
      
   }catch(e){
      console.error(e)
      return next(e)
   }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async (req, res, next) =>{
   const toUser = await User.get(req.body.to_user);
   let result;
   if(toUser.username){
      result = await Message.create({"from_username":req.user.username, 
                                             "to_username": toUser.username, 
                                             "body":req.body.body})
   }else{
      console.log("invalid user!")
   }

   return res.json({"message":result})
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/


router.post("/:id/read", ensureLoggedIn, async(req, res, next)=>{
   console.log("in read route")
   try{
      const message = await Message.get(req.params.id);
      if(message.to_user.username === req.user.username){
         const read = await Message.markRead(req.params.id)
         return res.json({"message":read})
      }else{
         raise
      }
      return res.json({"test":"ok"})
   }catch(e){
      console.log(e)
      next(new ExpressError("Unauthorized to read that", 401));
   }
})

module.exports = router;