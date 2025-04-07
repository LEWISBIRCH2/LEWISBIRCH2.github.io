const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const secret = process.env.ATLAS_URI;
const client = new MongoClient(secret);

let database;

module.exports = {
  connectToServer: () => {
    database = client.db("Museums");
  },
  getDb: () => {
    return database;
  },
};

//async function main() {
//   try {
//     await client.connect();
//     const collections = await client.db("Museums").collections();
//     collections.forEach((collection) =>
//       console.log(collection.s.namespace.collection)
//     );
//   } catch (e) {
//     console.log(e);
//   } finally {
//     await client.close();
//   }
// }}

// main();
