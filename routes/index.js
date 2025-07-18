const express = require("express");
const router = express.Router();

const tripRoutes = require("./trips");
const activityRoutes = require("./activities");

router.use("/trips", tripRoutes);
router.use("/activities", activityRoutes);

module.exports = router;
