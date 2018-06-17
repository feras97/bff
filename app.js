const express = require("express");

const PORT = 3000;
const app = express();


app.get("/", function(req,res){
    res.send("Hello from 'Server");
});

app.listen(PORT, function(){
    console.log("Server Running on: localhost:"+ PORT);
});