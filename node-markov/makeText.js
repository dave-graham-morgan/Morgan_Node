/** Command-line tool to generate Markov text. */

const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const axios = require('axios');
const markov = require('./markov.js');

async function start(inputType){
   let fileContents = '';
   if (inputType === 'file'){
      fileContents = await ingestFile()

   }else if (inputType ==='url'){
      fileContents = await ingestURL()
   }else{
      console.error("Something went wrong! That is not a valid type")
      process.exit(1)
   }
   const mm = new markov.MarkovMachine(fileContents)
   const stringArray = mm.makeText();
   console.log(stringArray.join(' '))
   console.log("and we're donzo.")
}

async function ingestURL(){
   let url = process.argv[3]
   try{
      let response = await axios.get(url)
      return response.data
   }catch (err){
      console.error(`something went wrong ${err}`)
      process.exit(1)
   }
}

async function ingestFile(){
   //ingest a file and pass to markov.js
   let path = process.argv[3]
   try{
      fs.accessSync(path, fs.constants.F_OK);
      const data = await readFileAsync(path, 'utf8');
      console.log("success Davey!")
      return data;

   }catch(err){
      console.error(`file not found: ${err}`);
      process.exit(1)
   }
   
}

const inputType = process.argv[2]
console.log(`inputType is ${inputType}`)
start(inputType)