export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 5001;

import logger from '../utils/logger.js';

export function getMongoURI() {
    let uri = process.env.MONGO_URI;

    if (!uri) {
        if (NODE_ENV === "production") {
            logger.error("MONGO_URI is not defined. Set it in Render environment variables!");
            process.exit(1);
        } else {
            logger.warn("MONGO_URI not defined, falling back to localhost for development");
            uri = "mongodb://localhost:27017/drink";
        }
    }

    return uri;
}
