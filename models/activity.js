const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Hiking", "Rafting", "Biking"], required: true },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Hard"],
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  durationHours: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Activity", activitySchema);
