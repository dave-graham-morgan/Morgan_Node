const express = require("express");
const router = new express.Router();
const User = require("../models/user")

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", async(req, res, next)=>{
   const allUsers = await User.all();
   return res.json({"users":allUsers})
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", async(req, res, next)=>{
   console.log(req.params.username)
   const user = await User.get(req.params.username)
   return res.json({user})
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", async(req, res, next)=>{
   const messagesTo = await User.messagesTo(req.params.username)
   return res.json({"messages": messagesTo})
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/from", async(req, res, next)=>{
   const messagesFrom = await User.messagesFrom(req.params.username)
   return res.json({"messages": messagesFrom})
})


module.exports = router