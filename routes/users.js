const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
