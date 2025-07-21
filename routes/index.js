const express = require("express");
const router = express.Router();

const authRoutes = require("./users");
const tripRoutes = require("./trips");
const activityRoutes = require("./activities");

router.use("/auth", authRoutes);

router.use("/trips", tripRoutes);
router.use("/activities", activityRoutes);

module.exports = router;
