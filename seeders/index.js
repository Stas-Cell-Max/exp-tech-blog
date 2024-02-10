const seedUsers = require('./YYYYMMDD-users');
const seedPosts = require('./YYYYMMDD-posts');
const seedComments = require('./YYYYMMDD-comments');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();
