const sequelize = require('../config/connection');
const seedUsers = require('./users');
const seedPosts = require('./posts'); // Assume you have this seeder
const seedComments = require('./comments'); // Assume you have this seeder

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    console.log('Users seeded');
    await seedPosts();
    console.log('Posts seeded');
    await seedComments();
    console.log('Comments seeded');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

seedAll();
