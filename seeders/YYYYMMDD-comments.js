

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        text: 'Great opinion!',
        postId: 1, // Assuming the first post has ID 1
        userId: 1, // Comment by the first user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Very informative.',
        postId: 1, // Assuming the same first post
        userId: 2, // Comment by the second user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Thanks for sharing.',
        postId: 1, // Assuming the same first post
        userId: 3, // Comment by the third user
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
