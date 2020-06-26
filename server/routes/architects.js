const express = require('express');
const routes = express.Router();
const mongo = require('../db/db');
const materialsController = require('../controllers/materials');
const uri = require("../db/db");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



routes.get('/getArchitects', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("users");
      collection.find({user:"architechturer"}).toArray((err, items) => {
        console.log("archtechturers : ",items);
        res.json(items)
        client.close();
      })
    })
})



module.exports = routes;