const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const secret = process.env.ATLAS_URI;
  const client = new MongoClient(secret);

  try {
    await client.connect();
    const collections = await client.db("Museums").collections();
    collections.forEach((collection) =>
      console.log(collection.s.namespace.collection)
    );
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main();
