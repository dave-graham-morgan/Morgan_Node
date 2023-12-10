const fs = require ('fs');

function cat(path){
   fs.readFile(path, utf8, (err, data)=> {
      if (err){
         console.error(`something went wrong: ${err}`)
         process.exit(1)
      }else{
         console.log(data)
      }
      
   })
}

