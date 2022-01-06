require("dotenv").config();
const { MongoClient } = require("mongodb");

const connection = async (crudFunc, movieObj) => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("movies");
    const collection = db.collection("Movies");
    await crudFunc(collection, movieObj);
    client.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
