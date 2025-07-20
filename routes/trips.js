const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTrip,
} = require("../controllers/trips");

// Get all recipes
router.get("/", getAllTrips);
// Get one Trip by Id
router.get("/:id", getTripById);
// Create A Trip
router.post("/", createTrip);
// Delete A Trip
router.delete("/:id", deleteTrip);

module.exports = router;
