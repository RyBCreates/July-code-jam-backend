const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3003;

const MONGODB_URI = "mongodb://127.0.0.1:27017/coloRUSH";

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// Routes
const index = require("./routes/index");
app.use("/coloRUSH/api", index);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
