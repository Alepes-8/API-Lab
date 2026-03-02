import UserRoles from "../models/userRoles.js";
import Users from "../models/users.js";

export async function seedAdmin() {
    const username = process.env.APP_ADMIN_USERNAME?.toLowerCase();
    const password = process.env.APP_ADMIN_PASSWORD?.trim();

    if (!username || !password) {
        throw new Error("APP_ADMIN_USERNAME or APP_ADMIN_PASSWORD not set. Skipping admin seed.");
    }

    const existing = await Users.findOne({email: username });

    if (existing) {
    console.log("Admin user already exists. Skipping creation.");
    return;
    }

    const userRole = await UserRoles.findOneAndUpdate(
        { name: "admin" },           // Query
        { $set: { name: "admin" } }, // Update
        { upsert: true, new: true }  // Options: create if missing + return updated doc
    );
    await UserRoles.findOneAndUpdate(
        { name: "normal" },           // Query
        { $set: { name: "normal" } }, // Update
        { upsert: true, new: true }  // Options: create if missing + return updated doc
    );

    await Users.create({
        email: username,
        password: password,
        role: userRole._id
    });

    console.log(`Admin user '${username}' created successfully.`);
}
