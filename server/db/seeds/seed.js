async function seed(collection, data) {
  try {
    const result = await collection.insertMany(data);
    console.log('Seed completed:', result);
  } catch (error) {
    console.error('Error during seed:', error);
  }
}

module.exports = seed;