const router = require('express').Router();

const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const commentRoutes = require('./api/comments');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
