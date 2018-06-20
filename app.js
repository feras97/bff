const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = "mongodb://feras97:f2714188@ds263380.mlab.com:63380/bff";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());


mongoose.connect(db, err => {
    if(err){
        console.error("Error!: " + err);
    }
    else{
        console.log("Conected to mongodb");
    }
});

app.get("/", (req,res) => {
    res.send("welcome king of teezos!");
});


app.post("/login", (req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.error(error);
        }else{
            if(!user){
                res.status(401).send("Email address doesn't exist!");
            } else if(user.password != userData.password){
                res.status(401).send("Invalid Password!");
            }else{
                res.status(200).send("login successful: " + user.email);
            }
        }
    });
});

app.post("/register", (req, res) => {
    let userData = req.body;
    userData.messages = [{
        "sender": 0,
        "text": "heyyy babe, what you need?",
    }];
    let user = new User(userData);
    User.findOne({email: user.email}, (err, found) => {
        if(err){
            console.error(err);
        } else{
            if(!found){
                user.save((error, registeredUser) => {
                    if(error){
                        console.error(error);
                    }else{
                        res.status(200).send("email registred successfully: " + user.email);
                    }
                });
            }else{
                res.status(401).send("User exists: " + user.email);
            }
        }
    });
});

app.post("/newtext", (req, res) => {
    let text = req.body;
    User.findOneAndUpdate({email: text.email}, { $push: 
        {messages: {
        "sender": 1,
        "text": text.text,
    }}}, {new: true}, (err, found) => {
        if(err){
            res.send(err);
        } else {
            res.send(found);
        }
    });
});

app.listen(PORT, function(){
    console.log("Server Started !");
});