const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {
}
 Comment.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 },
 {
 sequelize,
 timestamps: false,
 freezeTableName: true,
 underscored: true,
 modelName: 'user'
}
 );


 module.exports = Comment;


  