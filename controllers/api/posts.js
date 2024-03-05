const express = require('express');
const { Post } = require('../../models'); // Adjust the path as necessary
const isAuthenticated = require('../../middleware/isAuthenticated'); // Path to your authentication middleware

const router = express.Router();

// Create a new post
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId 
    });
    res.redirect('/');
  } catch (err) {
      console.log(err);
      res.status(400).json(err);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

// Get a single post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author', 
          attributes: ['name', 'id'], 
        },
        {
          model: Comment,
          as: 'comments', 
          include: {
            model: User,
            as: 'commenter', 
            attributes: ['name', 'id'] 
          }
        }
      ]
    });
    if (post) {
      
      res.render('post', {
        post: post.get({ plain: true }), // Converts the post to a plain object
        loggedIn: req.session.userId != null // Pass the loggedIn status to the template
      });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Error loading the post');
  }
});


// Update a post
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updated = await Post.update(req.body, {
      where: { 
        id: req.params.id, 
        userId: req.session.userId }
    });
    if (updatedPost) {
      res.send('Post updated successfully');
    } else {
      res.status(404).send('Post not found or user not authorized');
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(postData);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

module.exports = router;
