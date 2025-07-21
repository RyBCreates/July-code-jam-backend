const express = require("express");
const router = express.Router();

const authRoutes = require("./users");
const tripRoutes = require("./trips");
const activityRoutes = require("./activities");
const optimizerRoutes = require("./optimizer");

router.use("/auth", authRoutes);

router.use("/trips", tripRoutes);
router.use("/activities", activityRoutes);

router.use("/route", optimizerRoutes);

module.exports = router;
