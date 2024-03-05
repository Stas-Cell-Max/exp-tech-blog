const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const router = express.Router();

// Display Registration Page
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// Registration Route
router.post('/register', async (req, res) => {
  try {
    // Remove manual password hashing here, ensure it's done in the model's hook
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Let the hook handle hashing
    });

    req.session.userId = newUser.id;
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error during registration: ' + error.message);
  }
});


// Display Login Page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('pages/login');
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.error('Login error: User not found');
      return res.status(401).send('Incorrect email or password');
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      console.error('Login error: Invalid password');
      return res.status(401).send('Incorrect email or password');
    }

    req.session.userId = user.id;
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error during login: ' + error.message);
  }
});


// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
