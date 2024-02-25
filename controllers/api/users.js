const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();

    // Set user session
    req.session.userId = newUser.id;
    req.session.save(() => {
      res.redirect('/dashboard');
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect('/dashboard');
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(401).json({ message: 'No user to log out' });
  }
});

module.exports = router;
