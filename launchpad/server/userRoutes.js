const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let userRoutes = express.Router();

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
  let mongoObject = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    joinDate: new Date(),
    personalExhibits: [],
  };
  let data = await db.collection("Users").insertOne(mongoObject);
  response.json(data);
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
      personalExhibits: request.body.personalExhibits,
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

module.exports = userRoutes;
