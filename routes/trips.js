const express = require("express");
const router = express.Router();
const { getTrips } = require("../controllers/trips");

// Get all recipes
router.get("/", getTrips);

module.exports = router;
