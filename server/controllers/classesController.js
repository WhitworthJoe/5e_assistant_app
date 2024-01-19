const { ObjectId } = require("mongodb"); // Ensure you import ObjectId from mongodb
const { getCollection } = require("../db/connection");

// Controller functions
const getAllClasses = async (req, res) => {
  const classesCollection = await getCollection("classes");
  const classes = await classesCollection.find({}).toArray();
  res.json(classes);
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  console.log("ID from request:", id); // Log the raw id

  try {
    const classesCollection = await getCollection("classes"); // Ensure to get the collection
    const classItem = await classesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!classItem) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(classItem);
  } catch (error) {
    console.error("Error retrieving class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createClass = async (req, res) => {
  const { body } = req;
  const classesCollection = await getCollection("classes");

  try {
    const result = await classesCollection.insertOne(body);
    console.log("Insert result:", result);

    // Log the ops array
    console.log("Ops array:", result.ops);

    // Fetch the inserted document using insertedId
    const insertedDocument = await classesCollection.findOne({
      _id: result.insertedId,
    });
    console.log("Inserted document:", insertedDocument);

    res.status(201).json(insertedDocument);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const classesCollection = await getCollection("classes");

  try {
    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    const updatedClass = await classesCollection.findOne({
      _id: new ObjectId(id),
    });

    res.json({
      _id: updatedClass._id,
      class: updatedClass.class,
      hit_dice: updatedClass.hit_dice,
      message: "Class updated successfully",
    });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;
    const classesCollection = await getCollection("classes");
  
    try {
      const result = await classesCollection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      res.json({ message: "Class deleted successfully" });
    } catch (error) {
      console.error("Error deleting class:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
