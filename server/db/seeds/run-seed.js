const { connectToDatabase, closeConnection, client } = require('../connection');
const seed = require('./seed');
const testData = require('../data/test-data/index');
const fs = require('fs');
const path = require('path');

async function runSeed() {
  try {
    await connectToDatabase();

    const database = client.db('dnd_app'); // Update with your database name

    // Get all test data files in the test-data folder
    const testDataFiles = fs.readdirSync(path.join(__dirname, '../data/test-data'));

    // Create collections for each test data file
    for (const testDataFile of testDataFiles) {
      const collectionName = path.parse(testDataFile).name;
      const collectionData = require(`../data/test-data/${testDataFile}`);
      const collection = database.collection(collectionName);

      // Clear existing data in the collection
      await collection.deleteMany({});

      // Insert data into the collection
      await seed(collection, collectionData);

      console.log(`Seed completed for collection: ${collectionName}`);
    }
  } catch (error) {
    console.error('Error running seed:', error);
  } finally {
    await closeConnection();
  }
}

runSeed();