const express = require("express");
const router = express.Router();

const tripRoutes = require("./trips");

router.use("/trips", tripRoutes);

module.exports = router;
