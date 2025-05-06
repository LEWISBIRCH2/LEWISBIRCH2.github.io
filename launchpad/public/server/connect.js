const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const secret = process.env.ATLAS_URI;
const client = new MongoClient(secret);

let database;

module.exports = {
  connectToServer: async (callback) => {
    try {
      await client.connect();
      database = client.db("Museums");
      console.log("Connected to MongoDB: Museums");
      if (callback) callback();
    } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      if (callback) callback(err);
    }
  },
  getDb: () => {
    if (!database) throw new Error("Database not initialized");
    return database;
  },
};
