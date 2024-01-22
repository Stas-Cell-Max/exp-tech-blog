// 
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      // postId and userId will be foreign keys added automatically through associations
    });
  
    Comment.associate = (models) => {
      // This will add a foreign key in Comment table referencing Post's primary key
      Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      });
  
      // This will add a foreign key in Comment table referencing User's primary key
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Comment;
  };
  