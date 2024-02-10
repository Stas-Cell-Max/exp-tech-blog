'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Sonya',
        email: 'sonya@example.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Alex',
        email: 'alex@example.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Max',
        email: 'max3@example.com',
        password: bcrypt.hashSync('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
