const express = require('express');
const routes = express.Router();
const mongo = require('../db/db');
const materialsController = require('../controllers/materials');
const uri = require("../db/db");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



routes.get('/getChats', function (req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("chatRooms");
      collection.find().toArray((err, items) => {
        console.log(items);
        res.json(items)
        client.close();
      })
    })
})



module.exports = routes;