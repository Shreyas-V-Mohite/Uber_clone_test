const express = require("express");
const { signup, login, logout, getCurrentUser } = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser); // Check if logged in

// Protected route example
router.get("/protected", protectRoute, (req, res) => {
  res.json({ message: "You are authorized", user: req.session.user });
});

module.exports = router;
