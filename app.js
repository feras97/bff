const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const mongoose = require("mongoose");
const db = "mongodb://feras97:f2714188@ds263380.mlab.com:63380/bff";

const PORT = 3000;
const app = express();


mongoose.connect(db, err => {
    if(err){
        console.error("Error!: " + err);
    }
    else{
        console.log("Conected to mongodb");
    }
});

app.get("/", function(req,res){
    res.send("Hello from 'Server");
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
                res.status(200).send({user});
            }
        }
    });
});

app.post("/register", (req, res) => {
    let userData = req.body;
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
                        res.status(200).send("email registred successfully: " + registeredUser.email);
                    }
                });
            }else{
                res.status(200).send("User exist: " + user.email);
            }
        }
    });
});

app.listen(PORT, function(){
    console.log("Server Started !");
});