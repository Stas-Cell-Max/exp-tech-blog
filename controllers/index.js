const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const commentRoutes = require('./api/comments');
const userPageRoutes = require('./api/usersPageRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/', userPageRoutes);

module.exports = router;
