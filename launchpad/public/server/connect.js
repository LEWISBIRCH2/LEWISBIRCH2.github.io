const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const secret = process.env.ATLAS_URI;
const client = new MongoClient(secret);

let database;

module.exports = {
  connectToServer: () => {
    database = client.db("Museums");
    console.log("Connected to MUSEUMS");
  },
  getDb: () => {
    return database;
  },
};
