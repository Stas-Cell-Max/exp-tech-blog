const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { User } = require('../../models');
const router = express.Router();

// Registration Route
router.post('/register', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Log the user in directly after registration
    req.session.userId = newUser.id;
    req.session.loggedIn = true; // Mark the user as logged in

    // Redirect to the dashboard after successful registration
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Error registering new user", error: error.message });
  }
});

// Login Route
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.userId = user.id;
      req.session.loggedIn = true; // Mark the user as logged in

      // Redirect to the dashboard after successful login
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error('Logout error:', err);
        res.status(500).send('Could not log out, please try again');
      } else {
        // Optionally, redirect to the homepage or login page after logout
        res.redirect('/users/login');
      }
    });
  } else {
    res.status(200).send('You are not logged in');
  }
});

module.exports = router;
