const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");

class Post extends Model {
    //Functions
}

Post.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING(1500),
        
    },
    imageUrl:Sequelize.STRING
}, { sequelize, comment: "Post Table", modelName: "post" })

module.exports = Post;