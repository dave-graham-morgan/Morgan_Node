const express = require("express")
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use("/items", routes)

app.use((error, req, res, next) => {
   const status = error.status || 500;
   const message = error.message || 'Internal Server Error';
   res.status(status).send(message);
})

module.exports = app;

