const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDb();
  const userId = request.params.id;
  if (!ObjectId.isValid(userId)) {
    return response.status(400).json({ message: "Invalid user ID format" });
  }

  let data = await db
    .collection("Users")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data not found");
  }
});

userRoutes.route("/users").post(async (request, response) => {
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

userRoutes.route("/users/login").post(async (request, response) => {
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
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "6h" });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect password" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

userRoutes.route("/users/:id/add-artwork").post(async (req, res) => {
  const db = database.getDb();
  const userId = req.params.id;
  const artwork = req.body.artwork;

  if (!artwork) return res.status(400).json({ message: "No artwork provided" });

  try {
    const result = await db
      .collection("Users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { personalExhibit: artwork } }
      );
    res.json({ message: "Artwork added", result });
  } catch (err) {
    res.status(500).json({ message: "Error adding artwork", error: err });
  }
});

userRoutes.route("/users/:id/remove-artwork").post(async (req, res) => {
  const db = database.getDb();
  const userId = req.params.id;
  const artworkId = req.body.artworkId;

  try {
    const result = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          personalExhibit: {
            $or: [{ id: artworkId }, { objectID: artworkId }],
          },
        },
      }
    );
    res.json({ message: "Artwork removed", result });
  } catch (err) {
    res.status(500).json({ message: "Error removing artwork", error: err });
  }
});

module.exports = userRoutes;


// Allow users to change details?
// userRoutes.route("/Users/:id").put(async (request, response) => {
//   let db = database.getDb();
//   let mongoObject = {
//     $set: {
//       name: request.body.name,
//       email: request.body.email,
//       password: request.body.password,
//       joinDate: request.body.joinDate,
//       personalExhibit: request.body.personalExhibit,
//     },
//   };
//   let data = await db
//     .collection("Users")
//     .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
//   response.json(data);
// });
