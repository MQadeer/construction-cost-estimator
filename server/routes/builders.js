const express = require('express');
const routes = express.Router();
const mongo = require('../db/db');
const materialsController = require('../controllers/materials');
const uri = require("../db/db");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



routes.get('/getBuilders', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("users");
      collection.find({user:"builder"}).toArray((err, items) => {
        console.log("builders : ",items);
        res.json(items)
        client.close();
      })
    })
})

routes.post('/removeBuilder', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("users");
      collection.findOneAndDelete({_id:new ObjectID(req.body.id)},function(err,resp){
        console.log("builders : ",resp);
        res.send("success")
        client.close();
      })
    })
})
routes.post('/addOffer', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("offers");
      collection.insertOne({builderId:req.body.buildersId,from:{name:req.body.name,email:req.body.email},
      description:req.body.description,amount:req.body.amount},function(err,resp){
        res.send("success")
        client.close();
      })
    })
})
routes.post('/getOffers', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("offers");
      collection.find({builderId:req.body.id}).toArray((err, items) => {
        console.log("builders offers : ",items);
        res.json(items)
        client.close();
      })
    })
})

module.exports = routes;