const Trip = require("../models/trip");

// Get all trips for a user
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).populate(
      "activities.activityId"
    );
    res.status(200).json(trips);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get trips", error: err.message });
  }
};

// Get a specific trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("activities.activityId");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Failed to get trip", error: err.message });
  }
};

// Create a new trip
const createTrip = async (req, res) => {
  try {
    const { name, activities } = req.body;

    const newTrip = new Trip({
      name: name || "Untitled Trip",
      userId: req.user._id,
      activities,
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create trip", error: err.message });
  }
};

// Delete a trip
const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete trip", error: err.message });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTrip,
};
