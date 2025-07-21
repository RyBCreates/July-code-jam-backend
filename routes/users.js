const express = require("express");

const auth = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/me", auth, getCurrentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
