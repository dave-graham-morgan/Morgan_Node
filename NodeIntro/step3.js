const fs = require('fs')
const axios = require('axios')

function checkForOut(input){
   if (input === '--out'){
      outputToFile()
   }else{
      start(input);
   }
}

function start(input){
//generic entry point to determine which function to use
 
   try{
      fs.accessSync(input, fs.constants.F_OK);
      //if we get here we have a path to a file so call cat
      cat(input)
   }catch(err){
      //if its not a file, assume its html (which is absolutely fragile (we should try/catch) but OK for this homework)
      //anyway call webCat
      webCat(input)
   }
}

function cat(path){
   fs.readFile(path, 'utf8', (err, data)=> {
      if (err){
         console.error(`Something went wrong ${err}`)
      }else{
         console.log(data)
      }
   })
}

async function webCat(url){
   try{
      let response = await axios.get(url)
      console.log(response.data)
   }catch(e){
      console.log(`Error fetching ${url}: Error: request failed with status code ${e.response.status}`)
   }
}

function outputToFile(){
   const outputFile = process.argv[3]
   const inputFile = process.argv[4]
   fs.readFile(inputFile, 'utf8', (err, data)=> {
      if (err){
         console.error(`Something went wrong ${err}`)
      }else{
         fs.writeFile(outputFile, data, (err)=>{
            if(err){
               console.error(`something went wrong: ${err}`)
            }else{
               console.log(`no output, but ${outputFile} contains ${inputFile}`)
            }
         })
      }
   })
}

const input = process.argv[2]
checkForOut(input)