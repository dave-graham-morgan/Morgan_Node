const fs = require('fs').promises;
const axios = require('axios');

//get the filename from the command line
const args = process.argv
//extract just the filename (it will be the third element in the array process.argv)
const fileName = args[2]

async function readURLFile(fileName){
   //check filename in case we're running with debugger
   if(!fileName){
      fileName = "urls.txt";
   }
   const fileData = await fs.readFile(fileName, 'utf8')
   urls = fileData.split(/\r?\n/);
   getURLData(urls)
} //TODO add try/catch

readURLFile(fileName)

async function getURLData(urls){
   for (let url of urls){
      if(url === '') continue;
      try{
         const response = await axios.get(url);
         const urlRegex = /^(?:https?:\/\/)?([^\/]+)/;
         const match = url.match(urlRegex);
         const fileName = match[1]
         await fs.writeFile(fileName, response.data, 'utf8')
         console.info(`file: ${fileName} written successfully`)
      }catch(e){
         console.error(`error reading url. File:${fileName} not written. Error: ${e}`)
      }
   }
}
