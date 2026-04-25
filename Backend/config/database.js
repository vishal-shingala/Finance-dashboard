import mongoose from "mongoose";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("database");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("Connected with database", { host: conn.connection.host });
    
  } catch (error) {
    logger.error("MongoDB connection failed", { message: error.message });
    process.exit(1); 
  }
};

export default connectDB;
