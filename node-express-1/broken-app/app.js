const express = require('express');
let axios = require('axios');
let app = express();

app.use(express.json());

app.post('/', function(req, res, next) {
  try { 
    let developerPromises = req.body.developers.map(async developer => {
      const response = await axios.get(`https://api.github.com/users/${developer}`)
      return response.data;
    });
      Promise.all(developerPromises)
        .then(function (result){ 
          let devArray =  result.map(function(developer){
            return {"name":developer.name, "bio":developer.bio}
          })
          return res.send(JSON.stringify(devArray));
        })

  } catch(err) {
    console.error(`there was an error retrieving data. ${err.toString()}`)
    next(err);
  }
});

// app.listen(3000);
app.listen(8080, function(){
  console.log("app running on port: 8080");
})
