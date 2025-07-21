const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTrip,
} = require("../controllers/trips");

// Get all recipes
router.get("/", auth, getAllTrips);
// Get one Trip by Id
router.get("/:id", auth, getTripById);
// Create A Trip
router.post("/", auth, createTrip);
// Delete A Trip
router.delete("/:id", auth, deleteTrip);

module.exports = router;
