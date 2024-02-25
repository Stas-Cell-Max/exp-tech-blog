const express = require('express');
const { Post, User, } = require('../models'); // Import necessary models
const router = express.Router();

// Homepage route
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
          include: [{ model: User, attributes: ['name'] }],
          order: [['createdAt', 'DESC']], 
        });

        // Convert the Sequelize model instances into plain objects
        const posts = postsData.map(post => post.get({ plain: true }));

        // Render the home page template, passing the posts data and the login state
        res.render('pages/home', {
            posts,
            loggedIn: req.session.loggedIn, // Check if the user session indicates they're logged in
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).send('Error loading the homepage');
    }
});

module.exports = router;
