const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const commentRoutes = require('./api/comments');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
