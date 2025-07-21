const express = require("express");
const router = express.Router();
const { optimizeRoute } = require("../controllers/routes");

router.post("/optimize", optimizeRoute);

module.exports = router;
