import mongoose from "mongoose";

export const connetToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (error) {
    console.log("Error connecting to db: ", error.message);
  }
};
