const express = require('express');
const routes = express.Router();
const mongo = require('../db/db');
const materialsController = require('../controllers/materials');
const uri = require("../db/db");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



routes.get('/getMaterials', function (req, res) {
  console.log('materials ')
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("materials");
      collection.find().toArray((err, items) => {
        console.log(items);
        res.json(items)
        client.close();


      })
      // client.connect(err => {
      //   const collection = client.db("cce").collection("materials");
      //   collection.find().toArray((err, items) => {
      //     console.log(items);
      //     res.json(items)

      //   })
    });
})

routes.post('/updateMaterial', function (req, res) {
  console.log('update materials ')
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("materials");
      const prices = {}
      if (req.body.priceFrom == null) {
        collection.findOneAndUpdate({ _id: new ObjectID(req.body.id) }, { $set: { priceTo: req.body.priceTo } }, function (err, resp) {
          console.log(err || resp);
          res.send("success")
          client.close();
        })
      }
      else if (req.body.priceTo == null) {
        collection.findOneAndUpdate({ _id: new ObjectID(req.body.id) }, { $set: { priceFrom: req.body.priceFrom } }, function (err, resp) {
          console.log(err || resp);
          res.send("success")
          client.close();
        })
      }
      else {
        collection.findOneAndUpdate({ _id: new ObjectID(req.body.id) }, { $set: { priceFrom: req.body.priceFrom, priceTo: req.body.priceTo } }, function (err, resp) {
          console.log(err || resp);
          res.send("success")
          client.close();
        })
      }
    });
})

module.exports = routes;