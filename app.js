const express = require("express");

const PORT = 3000;
const app = express();


app.get("/", function(req,res){
    res.send("Hello from 'Server");
});

app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server Started !");
});