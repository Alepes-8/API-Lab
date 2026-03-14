import mongoose from "mongoose";
import { getMongoURI } from "./config/config.js";
import logger from "./utils/logger.js"

(async () => {
  try {
    const uri = getMongoURI();
    logger.info("Connecting to MongoDB at:", uri);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("Connected!");
    await mongoose.disconnect();
  } catch (err) {
    logger.error(err, "Connection failed:");
  }
})();