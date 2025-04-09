const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();

const SALT_ROUNDS = 6; // Used for password encryption

// Retrieve All
userRoutes.route("/Users").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("Users").find({}).toArray();
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

// Retrieve One
userRoutes.route("/Users/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Users")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

// Create
userRoutes.route("/Users").post(async (request, response) => {
  let db = database.getDb();

  const takenEmail = await db
    .collection("Users")
    .findOne({ email: request.body.email });

  if (takenEmail) {
    response.json({ message: "The email is taken" });
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      personalExhibit: [],
    };
    let data = await db.collection("Users").insertOne(mongoObject);
    response.json(data);
  }
});

// Update
userRoutes.route("/Users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      personalExhibit: request.body.personalExhibit,
    },
  };
  let data = await db
    .collection("Users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

// Delete
userRoutes.route("/Users/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Users")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

//     -----     Login     -----
userRoutes.route("/Users/login").post(async (request, response) => {
  let db = database.getDb();

  const user = await db
    .collection("Users")
    .findOne({ email: request.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect password" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

module.exports = userRoutes;
