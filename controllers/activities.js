const activities = require("../mockData/activities");

const getActivities = (req, res) => {
  try {
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).send("Failed to load activities");
  }
};

// Get one activity

module.exports = { getActivities };
