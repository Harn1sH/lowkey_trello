const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to ${connection.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
