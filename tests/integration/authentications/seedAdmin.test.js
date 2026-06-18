import UserRoles from "../../../src/models/userRoles.js";
import Users from "../../../src/models/users.js";
import mockingoose from "mockingoose";
import { beforeEach, jest } from "@jest/globals";

let logger;
let seedAdmin;

describe("SeedAdmin integration testing", () => {

    beforeEach(async () => {
        jest.resetModules();

        // ✅ Mock FIRST
        jest.unstable_mockModule('../../../src/utils/logger.js', () => ({
            default: {
                info: jest.fn(),
                warn: jest.fn(),
                error: jest.fn(),
            }
        }));

        // ✅ Import AFTER mock
        logger = (await import('../../../src/utils/logger.js')).default;

        // ✅ Import function AFTER mock
        seedAdmin = (await import('../../../src/authentication/seedAdmin.js')).seedAdmin;

        jest.spyOn(process, "exit").mockImplementation(() => {});
    });

    it("Admin already exist end creation early", async () => {
        process.env.APP_ADMIN_USERNAME = "FakeAdmin@Test.com";
        process.env.APP_ADMIN_PASSWORD = "secret";

        mockingoose(Users).toReturn({}, "findOne");

        await seedAdmin();

        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining("Admin user already exists. Skipping creation.")
        );
    });

    it("Should go through the process creating the admin user", async () => {
        const username = "FakeAdmin@Test.com";

        process.env.APP_ADMIN_USERNAME = username;
        process.env.APP_ADMIN_PASSWORD = "secret";

        const adminUserRole = { _id: "123123123123", name: "admin" };

        mockingoose(Users).toReturn(null, "findOne");
        mockingoose(UserRoles).toReturn(adminUserRole, "findOneAndUpdate");

        await seedAdmin();

        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining(
                `Admin user '${username.toLowerCase()}' created successfully.`
            )
        );
    });
});