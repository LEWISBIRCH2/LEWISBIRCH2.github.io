const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let galleryRoutes = express.Router();

// Retrieve All
// REMOVED VERIFY TOKEN FUNCTION CALL
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
galleryRoutes
  .route("/Gallery/:id")
  .get(verifyToken, async (request, response) => {
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

// Create
galleryRoutes.route("/Gallery").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    museum: request.body.museum,
    title: request.body.title,
    description: request.body.description,
  };
  let data = await db.collection("Gallery").insertOne(mongoObject);
  response.json(data);
});

// Update
galleryRoutes
  .route("/Gallery/:id")
  .put(verifyToken, async (request, response) => {
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
galleryRoutes
  .route("/Gallery/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("Gallery")
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

// Security check. Verifying saved token matches with that on the backend (to avoid malicious alterations)
async function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  console.log("GALLERYROUTES L80", "AUTH-HEADERS", authHeaders);
  console.log(request.headers);
  console.log("GALLERYROUTES L81", "TOKEN?", token);

  if (!token) {
    return response
      .status(401)
      .json({ message: "Auth token missing (VerifyToken)" });
  }
  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Auth token not accepted" });
    }

    request.user = user;
    next();
  });
}
module.exports = galleryRoutes;
