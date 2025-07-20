const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["hiking", "rafting", "biking"], required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  durationHours: { type: Number, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Activity", activitySchema);
