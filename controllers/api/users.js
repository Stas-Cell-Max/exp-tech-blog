const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user with the hashed password
    const newUser = await User.create({
      username: req.body.username,
     
      email: req.body.email,
      password: hashedPassword,
    });
    // Respond with the newly created user (excluding the password)
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: "Error registering new user", error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      
      req.session.userId = user.id; // Log the user in by setting the session userId
      res.json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

router.get('/logout', (req, res) => {
    if (req.session) {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send('Could not log out, please try again');
        } else {
          res.send('You are now logged out');
        }
      });
    } else {
      // If there's no session, inform the user they're not logged in
      res.send('You are not logged in');
    }
  });
  

module.exports = router;
