const mongoose = require("mongoose");
const Activity = require("../models/activity");

//  Get all activities
const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.find({});
    res.status(200).json(allActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).send("Failed to load activities");
  }
};

// Get one activity
const getActivityById = async (req, res) => {
  try {
  } catch {}
};

module.exports = { getActivities, getActivityById };
