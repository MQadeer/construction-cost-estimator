const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
const MongoClient = require('mongodb').MongoClient;
const uri = require("../db/db");
const ObjectID = require('mongodb').ObjectID;


passport.use(new LocalStrategy({ usernameField: "email" }, (email, password,userType, done) => {
  /** Check User Exist With This Email */
  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return done(null, false);
  //     }

  //     /** Compare Password  */
  //     bcrypt.compare(password, user.password).then((isMatch) => {
  //       if (!isMatch) {
  //         return done(null, false, { message: "password dose not match." });

  //       }

  //       return done(null, user);
  //     });
  //   })
  //   .catch((err) => {
  //     return done(null, false, { message: "failed to login." });
  //   });
  console.log("in passport ");
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      // const data = req.body.info;
      const collection = client.db("cce").collection("users");
      collection.findOne({ email: email, password: password,user:userType }, function (err, user) {
        // console.log("error ", err || "items ", resp);
        client.close();
        return done(null, user)
      })
    }).catch(err => {
      console.log("error is : ", err)
    })

  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   // perform actions on the collection object
  //   const collection = client.db("cce").collection("users");
  //   collection.findOne({ email: email, password: password }, function (err, user) {
  //     // console.log("error ", err || "items ", resp);
  //     return done(null, user)
  //   })
  //   client.close();
  // });

})
);


passport.serializeUser((user, next) => {

  return next(null, user._id);
});
passport.deserializeUser((userId, next) => {
  // User.findOne({ _id: userId })
  //   .then((user) => {
  //     return next(null, user);
  //   })
  MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
      const collection = client.db("cce").collection("users");
      collection.findOne({ _id: userId }, function (err, resp) {
        client.close();
        return next(null, resp)
      })
    })
    .catch((err) => {
      next(err, null);
    });
});

module.exports = passport;
