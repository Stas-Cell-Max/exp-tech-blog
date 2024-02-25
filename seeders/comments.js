const { Comment } = require('../models'); // Adjust path as necessary

const seedComments = async () => {
  const commentData = [
    {
      comment: 'Great opinion!',
      postId: 1, // Assuming the first post has ID 1
      userId: 1, // Comment by the first user
    },
    {
      comment: 'Very informative.',
      postId: 1, // Assuming the same first post
      userId: 2, // Comment by the second user
    },
    {
      comment: 'Thanks for sharing.',
      postId: 1, // Assuming the same first post
      userId: 3, // Comment by the third user
    }
  ];

  for (const comment of commentData) {
    await Comment.create(comment);
  }
};

module.exports = seedComments;
