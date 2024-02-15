import mongoose from "mongoose";

let db;

export const connectToDB = async () => {
  try {
    if (db && mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return db;
    }

    db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
};
