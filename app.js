const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./db/userModel");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Establising connection with Atlas MongoDB
dbConnect();
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});
app.post("/register", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User Created Sucessfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Failed to create the user",
            error,
          });
        });
    })
    .catch((e) => {
      req.status(500).send({
        message: "bcrypt failed to hash the password",
        e,
      });
    });
});
app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((e) => {
          res.status(400).send({
            message: "Passwords does not match",
            e,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
});
module.exports = app;
