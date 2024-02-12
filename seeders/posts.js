const { Post } = require('../models'); // Adjust path as necessary

const seedPosts = async () => {
  const postData = [
    {
      title: 'Starting Your Web Development Journey',
      content: 'Web development begins with HTML, CSS, and JavaScript—the core building blocks of the web...',
      userId: 1, // Assuming the first user has ID 1
    },
    {
      title: 'Exploring JavaScript Frameworks',
      content: 'JavaScript frameworks like React, Angular, and Vue have revolutionized web development...',
      userId: 2, // Assuming the second user has ID 2
    },
    {
      title: 'Demystifying RESTful APIs',
      content: 'RESTful APIs facilitate communication between different systems on the web...',
      userId: 3, // Assuming the third user has ID 3
    }
  ];

  for (const post of postData) {
    await Post.create(post);
  }
};

module.exports = seedPosts;
