const mongoose = require("mongoose");
const Activity = require("../models/activity");
const activities = require("../mockData/activities");

mongoose
  .connect("mongodb://localhost:27017/coloRUSH_db")
  .then(async () => {
    console.log("MongoDB connected. Seeding...");

    await Activity.deleteMany({});
    await Activity.insertMany(activities);

    console.log("Seeding complete. Exiting.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
