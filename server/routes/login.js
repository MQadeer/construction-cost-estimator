const express = require('express');
const routes = express.Router();
const mongo = require('../db/db');
const uri = require("../db/db");
const MongoClient = require('mongodb').MongoClient;
const passport = require("../Routers/passport_auth");


routes.post('/signIn', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.json(req.user);

})
routes.get('/signOut', function (req, res) {
  req.logOut();
  res.send("logout successful");

})

routes.post('/signUp', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const data = req.body;
      const collection = client.db("cce").collection("users");
      collection.insertOne({name:data.name,password:data.password,email:data.email,
        user:data.userType,number:data.number,description:data.description}, function (err, resp) {
        // res.json(resp)
        if(err){
          res.send("error")
        }
        else{
          res.send("success")
        }
        client.close();


      })
    }).catch(err => {
      console.log("error is : ", err)
    })
})


module.exports = routes;