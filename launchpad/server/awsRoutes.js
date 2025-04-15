const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } =
  require * "@aws-sdk-client-s3";
require("dotenv").config({ path: "./config.env" });

let awsRoutes = express.Router();
const s3Bucket = "launchpad - project - elby2";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Retrieve One
awsRoutes.route("/images/:id").get(verifyToken, async (request, response) => {
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
awsRoutes.route("/images").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    museum: request.body.museum,
    title: request.body.title,
    description: request.body.description,
  };
  let data = await db.collection("Gallery").insertOne(mongoObject);
  response.json(data);
});

// Delete
awsRoutes
  .route("/images/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("Gallery")
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

// Security check. Verifying saved token matches with that on the backend (to avoid malicious alterations)
function verifyToken(request, response, next) {
  console.log("LOWER>>>", request.headers["authorization"]);

  const authHeaders = request.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

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
module.exports = awsRoutes;
