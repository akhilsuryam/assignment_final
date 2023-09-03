// auth-routes.js
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Log in an existing user
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success", // Redirect to success page on successful login
    failureRedirect: "/failure", // Redirect to failure page on failed login
  })
);

module.exports = router;
