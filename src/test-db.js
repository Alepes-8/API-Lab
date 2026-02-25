import mongoose from "mongoose";
import { getMongoURI } from "./config/config.js";

(async () => {
  try {
    const uri = getMongoURI();
    console.log("Connecting to MongoDB at:", uri);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Connection failed:", err);
  }
})();