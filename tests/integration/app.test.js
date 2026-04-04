import request from "supertest";
import { STATUS_CODES } from "../../src/config/constants.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { beforeEach, jest } from "@jest/globals";
import mongoose from "mongoose";
import * as dbModule from "../../src/db/index.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filePath = path.resolve(dirname, "../../src/config/testData/drinks_start_A.json");
export const START_DATA = JSON.parse(fs.readFileSync(filePath, "utf-8"));

let logger;
let app;
let processExitSpy;



describe("Drink API Integration Tests", () => {
    const { connectDB, disconnectDB, getMongoURI } = dbModule;

    beforeEach(async () => {
        jest.resetModules();

         // Mock getMongoURI
        await jest.unstable_mockModule("../../src/db/index.js", async () => {
            const originalModule = await import("../../src/db/index.js");
            return {
            ...originalModule,
            getMongoURI: jest.fn(),
            };
        });
        
        // Mock logger FIRST
        jest.unstable_mockModule('../../src/utils/logger.js', () => ({
            default: {
                info: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
            }
        }));

        // Import logger AFTER mock
        logger = (await import('../../src/utils/logger.js')).default;

        // spies
        processExitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});        
    });

    it("should not connect to DB or start server in test environment", async () => {
        process.env.NODE_ENV = "test";

        app = (await import("../../src/app.js")).default;

        expect(logger.info).not.toHaveBeenCalledWith(
            expect.stringContaining("Connecting to MongoDB")
        );
    });

    it("should attempt to connect to DB in production environment", async () => {
        process.env.NODE_ENV = "production";

        const mockConnectDB = jest.fn().mockResolvedValue();

        // ESM-safe mock
        jest.unstable_mockModule("../../src/db/index.js", () => ({
            connectDB: mockConnectDB
        }));

        app = (await import("../../src/app.js")).default;

        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining("Connecting to MongoDB")
        );
    });

    it("should connect to MongoDB when MONGO_URI is provided", async () => {
        getMongoURI.mockReturnValue("mongodb://test-uri:27017/testdb");
        const connectSpy = jest.spyOn(mongoose, "connect").mockResolvedValue();

        const conn = await connectDB();

        expect(connectSpy).toHaveBeenCalledWith("mongodb://test-uri:27017/testdb");
        expect(logger.info).toHaveBeenCalledWith("MongoDB connected");

        connectSpy.mockRestore();
    });

    it("should warn and exit process when MONGO_URI is missing", async () => {
        getMongoURI.mockReturnValue(null);
        const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => { throw new Error("process.exit called"); });

        await expect(connectDB()).rejects.toThrow("process.exit called");
        expect(logger.warn).toHaveBeenCalledWith(
        "MONGO_URI missing, falling back to localhost"
        );

        exitSpy.mockRestore();
    });

    it("should disconnect from MongoDB", async () => {
        const disconnectSpy = jest.spyOn(mongoose, "disconnect").mockResolvedValue();
        await disconnectDB();
        expect(disconnectSpy).toHaveBeenCalled();
        disconnectSpy.mockRestore();
    });

    it("GET /drink/health should return health status", async () => {
        app = (await import("../../src/app.js")).default;

        const res = await request(app).get("/drink/health");

        expect(res.statusCode).toBe(STATUS_CODES.SUCCESS);
        expect(res.body.status).toBe("ok");
        expect(typeof res.body.mongoStatus).toBe("string");
    });

    it("GET /api-docs should load Swagger UI", async () => {
        app = (await import("../../src/app.js")).default;

        const res = await request(app)
            .get("/api-docs")
            .redirects(1);

        expect(res.statusCode).toBe(STATUS_CODES.SUCCESS);
        expect(res.text).toMatch(/Swagger UI/i);
    });

    it("should warn and fallback to localhost if MONGO_URI is undefined and not in production", async () => {
        process.env.NODE_ENV = "development";
        process.env.MONGO_URI = "";

        const { getMongoURI } = await import("../../src/config/config.js");

        const MONGO_URI = getMongoURI();

        expect(logger.warn).toHaveBeenCalledWith(
            expect.stringContaining("falling back to localhost")
        );
        expect(MONGO_URI).toBe("mongodb://localhost:27017/drink");
//        expect(processExitSpy).not.toHaveBeenCalled(1);
    });

    it("should error and exit if MONGO_URI is undefined in production", async () => {
        process.env.NODE_ENV = "production";
        process.env.MONGO_URI = "";

        const { getMongoURI } = await import("../../src/config/config.js");

        const MONGO_URI = getMongoURI();

        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining("MONGO_URI is not defined")
        );
        expect(processExitSpy).toHaveBeenCalledWith(1);
        expect(MONGO_URI).toBe("");
    });
});