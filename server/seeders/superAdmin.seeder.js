require("dotenv").config();
const UserModel = require("../models/user.model");


async function seedAdmin() {
  try {
    const existingAdmin = await UserModel.findOne({ role: "superAdmin" });

    if (!existingAdmin) {
      const adminCredentials = {
        name: process.env.NAME_ADMIN,
        email: process.env.EMAIL_ADMIN,
        password: process.env.PASSWORD_ADMIN,
        confirmPassword: process.env.PASSWORD_ADMIN,
        role: process.env.ROLE_ADMIN,
        refreshToken: process.env.REFRESH_TOKEN_ADMIN,
      };

      await UserModel.create(adminCredentials);
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Error seeding admin:", err);
    throw err; // Relancez l'erreur pour qu'elle soit gérée par `startServer`
  } 
}

module.exports = {seedAdmin};