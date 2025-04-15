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
  const id = request.params.id;
  const bucketParams = {
    Bucket: s3Bucket,
    Key: id,
  };

  const data = await s3Client.send(new GetObjectCommand(bucketParams));

  const contentType = data.contentType;
  const srcString = await data.body.transformToString("base64");
  const imageSource = `data:${contentType};base64,${srcString}`;

  response.json(imageSource);
});

// Create
awsRoutes.route("/images").post(verifyToken, async (request, response) => {
  const file = request.body;
  const bucketParams = {
    Bucket: s3Bucket,
    Key: file.name,
    Body: file,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));

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
