const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // Update this with your MongoDB connection string
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function closeConnection() {
  await client.close();
  console.log('Connection to MongoDB closed');
}

// Add this function to get a collection from the connected database
async function getCollection(collectionName) {
  const database = client.db('dnd_app'); // Update with your database name
  return database.collection(collectionName);
}

module.exports = { connectToDatabase, closeConnection, client, getCollection };