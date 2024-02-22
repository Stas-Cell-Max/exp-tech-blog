const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}
Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
  sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post', 
}
)

module.exports = Post;


// module.exports = (sequelize, DataTypes) => {
//     const Post = sequelize.define('Post', {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       }
//     });
  
//     Post.associate = (models) => {
//       Post.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false
//         }
//       });
//       Post.hasMany(models.Comment, {
//         onDelete: 'CASCADE'
//       });
//     };
  
//     return Post;
//   };
  