const express = require('express');
const { Comment, User } = require('../../models'); // Adjust the path as necessary
const isAuthenticated = require('../../middleware/isAuthenticated'); // Path to your authentication middleware
const router = express.Router();

// Add a new comment to a post
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      postId: req.params.postId,
      userId: req.session.userId // Assuming the userId is stored in the session upon login
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "Error adding comment", error: error.message });
  }
});

// Delete a comment
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    // Ensure the comment belongs to the logged-in user
    const result = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });
    if (result > 0) {
      res.send('Comment deleted');
    } else {
      res.status(404).send('Comment not found or user not authorized');
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
});

module.exports = router;
