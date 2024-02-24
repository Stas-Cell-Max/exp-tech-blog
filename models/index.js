
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id' 
});

// Adjusting User and Comment relationship
User.hasMany(Comment, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id' 
});

// Adjusting Post (Blog) and Comment relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id', 
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id' 
});

module.exports = { User, Post, Comment };