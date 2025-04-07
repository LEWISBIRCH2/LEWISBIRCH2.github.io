const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let userRoutes = express.Router();

userRoutes.route("/Users/:username").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Users")
    .findOne({ _username: new ObjectId(request.params.username) }) // careful w username. tutorial uses ID. Could be diff.
    .toArray();
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

userRoutes.route("/Users").post(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    username: request.body.username,
    pass: request.body.pass,
    personalExhibit: [],
  };
  let data = await db.collection("Users").insertOne(mongoObject);
  response.json(data);
});

userRoutes.route("/Users/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      username: request.body.username,
      pass: request.body.pass,
      personalExhibit: [],
    },
  };
  let data = await db
    .collection("Users")
    .updateOne(
      { _username: new ObjectId(request.params.username) },
      mongoObject
    );
  response.json(data);
});

userRoutes.route("/Users/:username").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Users")
    .deleteOne({ _username: new ObjectId(request.params.username) }); // careful w username. tutorial uses ID. Could be diff.
  response.json(data);
});

module.exports = userRoutes;
