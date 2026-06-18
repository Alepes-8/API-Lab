import mongoose from "mongoose";
import { getMongoURI } from "../config/config.js";
import logger from "../utils/logger.js"

export const connectDB = async () => {
    const MONGO_URI = getMongoURI();

    if (!MONGO_URI) {
        logger.warn("MONGO_URI missing, falling back to localhost");
        process.exit(1);
    }

    const uri = MONGO_URI || "mongodb://localhost:27017/drink";

    // restricts and helps creaste a defualt behavior to exlude unknown fields
    mongoose.set("strictQuery", true);

    await mongoose.connect(uri);
    logger.info("MongoDB connected");

    return mongoose.connection;
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
};
