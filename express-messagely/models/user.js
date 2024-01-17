const db = require("../db");
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** User class for message.ly */



/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    const now = new Date()
    let hashedPassword;
    try{
      hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    }catch(e){
      console.error(`error with bcrypt password hash. ${e.toString()}`)
    }
    
    const newUser = await db.query(`INSERT INTO USERS (username, password, first_name, last_name, phone, join_at)
                                    Values ($1, $2, $3, $4, $5, $6)
                                    RETURNING username, password, first_name, last_name, phone`, 
                                    [username, hashedPassword, first_name, last_name, phone, now])

    return newUser.rows[0]
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    try{
      const result = await db.query("SELECT password FROM users WHERE username = $1", [username])
      const user = result.rows[0];
      if(user && await bcrypt.compare(password, user.password)){
          return true;
      }
      throw new ExpressError("Invalid username/password", 401)
    }catch(e){
      console.error(e);
    }
    
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
    try{
      const now = new Date().toISOString();
      const result = await db.query(`UPDATE users SET last_login_at = $1
                                    WHERE username = $2
                                    RETURNING last_login_at`, [now, username])

    }catch(e){
      console.error(e)
    }
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const results = await db.query(`SELECT username, first_name, last_name, phone from Users`)
    return results.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    try{
      const results = await db.query(`SELECT username, first_name, last_name, phone, join_at, last_login_at
                             FROM users
                             WHERE username = $1`, [username]);
      const user = results.rows[0];
      if(user){
        return user;
      }
      return new ExpressError(`user: ${username} not found`, 404);
    }catch(e){
      console.error(e);
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    try{
      const results = await db.query(`SELECT m.id, m.body, m.sent_at, m.read_at, u.username, u.first_name, u.last_name, u.phone
                                      FROM messages m
                                      LEFT JOIN users u ON m.to_username = u.username
                                      WHERE m.from_username = $1`, [username]);
      const transformedData = results.rows.map(item=>{
        return {
          id:item.id,
          body:item.body,
          sent_at:item.sent_at,
          read_at:item.read_at,
          to_user:{
            username:item.username,
            first_name:item.first_name,
            last_name:item.last_name,
            phone:item.phone
          }
        };
      });
      return transformedData;
    }catch(e){
      console.error(e);
    }
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    try{
      const results = await db.query(`SELECT m.id, m.from_username, m.body, m.sent_at, m.read_at, u.username, u.first_name, u.last_name, u.phone
                                      FROM messages m
                                      LEFT JOIN users u 
                                      ON m.from_username = u.username
                                      WHERE m.to_username = $1`, [username]);
    
      const transformedData = results.rows.map(item=>{
        return {
          id:item.id,
          body:item.body,
          sent_at:item.sent_at,
          read_at:item.read_at,
          from_user:{
            username:item.username,
            first_name:item.first_name,
            last_name:item.last_name,
            phone:item.phone
          }
        };
      });
    return transformedData;
    }catch(e){
      console.error(e);
    }
  }
}


module.exports = User;