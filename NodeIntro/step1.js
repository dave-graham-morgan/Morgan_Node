const fs = require('fs')

function cat(path){
   fs.readFile(path, 'utf8', (err, data)=> {
      if (err){
         console.error(`Something went wrong ${err}`)
      }else{
         console.log(data)
      }
   })
}
const filePath = process.argv[2]
console.log(process.argv)
cat(filePath)