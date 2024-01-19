const { connectToDatabase, closeConnection, client } = require('./db/connection');

async function fetchData() {
  try {
    await connectToDatabase();
    
    const database = client.db('dnd_app'); // Update with your database name
    const usersCollection = database.collection('users'); // Update with your collection name

    const users = await usersCollection.find().toArray();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await closeConnection();
  }
}

fetchData();