require("dotenv").config();  // command "npm run admin-seeder"
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");


async function seedAdmin() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Established a connection to the database');
    } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1); 
    }
  
    try {
      const existingAdmin = await UserModel.findOne({ role: 'admin' });
  
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
      console.error("Error creating admin user:", err);
      process.exit(1); 
    }
  
    await mongoose.disconnect();
  }


seedAdmin().then(() => {
  console.log("Admin seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});