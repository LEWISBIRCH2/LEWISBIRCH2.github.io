const fs = require("fs");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "museum";
const collectionName = "specimens";
const jsonFilePath = "./specimens.json"; // adjust path as needed

async function seedFromJSON() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read and parse the JSON file
    const rawData = fs.readFileSync(jsonFilePath);
    const data = JSON.parse(rawData);

    // Optional: Clean or transform data here
    // const cleanedData = data.map(item => ({ ... }))

    // Insert data into MongoDB
    const result = await collection.insertMany(data);
    console.log(`✅ Inserted ${result.insertedCount} records into '${collectionName}'`);

  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedFromJSON();
