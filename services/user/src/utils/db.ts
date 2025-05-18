import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "blog-microservices"
    });
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectDB;