import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
   {
    email: "ansh@gmail.com",
    fullName: "Ansh Patel",
    password: "123456",
    profilePic: "/ansh.jpg",
  },
 
];

import bcrypt from "bcryptjs";

const seedDatabase = async () => {
  try {
    await connectDB();

    // Remove existing seeded users (emails from seed)
    const emails = seedUsers.map((u) => u.email);
    await User.deleteMany({ email: { $in: emails } });

    // Hash passwords before inserting
    const usersToInsert = await Promise.all(
      seedUsers.map(async (u) => {
        const salt = await bcrypt.genSalt(10);
        // Randomize lastSeen to show mix of online/offline users (0-10 minutes ago)
        const minutesAgo = Math.floor(Math.random() * 10);
        return {
          ...u,
          password: await bcrypt.hash(u.password, salt),
          lastSeen: new Date(Date.now() - minutesAgo * 60 * 1000),
        };
      })
    );

    await User.insertMany(usersToInsert);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
