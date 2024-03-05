const express = require('express');
const { Post, User, Comment } = require('../models');
const router = express.Router();

// Homepage route
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [{ model: User, attributes: ['name'] }]
        });
        const posts = postsData.map(post => post.get({ plain: true }));
        res.render('pages/home', { posts, loggedIn: req.session.loggedIn || false });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).send('Error loading the homepage');
    }
});

// Single Post route
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment, include: [{ model: User, attributes: ['name'] }] }
            ]
        });
        if (!postData) {
            res.status(404).send('Post not found');
            return;
        }
        const post = postData.get({ plain: true });
        res.render('pages/post', { post, loggedIn: req.session.loggedIn || false });
    } catch (error) {
        console.error('Error loading post:', error);
        res.status(500).send('Error loading the post');
    }
});

module.exports = router;
