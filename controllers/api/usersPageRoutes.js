const express = require('express');
const router = express.Router();

// Display Registration Page
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// Display Login Page
router.get('/login', (req, res) => {
  res.render('pages/login');
});

module.exports = router;
