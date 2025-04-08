const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let galleryRoutes = express.Router();

// Retrieve All
galleryRoutes.route("/Gallery").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("Gallery").find({}).toArray();
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

// Retrieve One
galleryRoutes.route("/Gallery/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Gallery")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

// Update
galleryRoutes.route("/Gallery").post(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    museum: request.body.museum,
    title: request.body.title,
    description: request.body.description,
  };
  let data = await db.collection("Gallery").insertOne(mongoObject);
  response.json(data);
});

// Create
galleryRoutes.route("/Gallery/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      museum: request.body.museum,
      title: request.body.title,
      description: request.body.description,
    },
  };
  let data = await db
    .collection("Gallery")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

// Delete
galleryRoutes.route("/Gallery/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("Gallery")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

module.exports = galleryRoutes;
