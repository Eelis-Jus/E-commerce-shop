//this is the nodejs server for the e-commerce website project
//https://dev.to/ahmadtheswe/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2
//remake with a https://www.youtube.com/watch?v=DihOP19LQdg&ab_channel=BeaufortTek
//do a middleware 

const bodyParser = require("body-parser");
const cors=require("cors");
const routes = require('./routers')
const express = require("express");
const logwriter=require('./logwriter')


const app = express();
const port = 3000;
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(express.json());
app.use(cors(corsOptions))

app.listen(port, () => {
    logwriter.ServerLogWriter(`Example app listening on port ${port}`)
})


app.use("/api", routes);

module.exports = app;

