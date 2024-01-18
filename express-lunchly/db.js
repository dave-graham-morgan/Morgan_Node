/** Database for lunchly */

const pg = require("pg");

let DB_URI;

if (process.env.NODE_ENV === 'test'){
   DB_URI = 'postgresql:///lunchly_test';
}else{
   DB_URI = 'postgresql:///lunchly';
}

let db = new pg.Client({
   connectionString: DB_URI
})

async function connectToDB(){
   try{
      await db.connect();
      const now = new Date();
      console.log("Connected to db at", now)
   }catch(e){
      console.error("error connecting to db", e)
   }
}
connectToDB();

module.exports = db;
