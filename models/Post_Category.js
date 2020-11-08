const { Model } = require("sequelize");
const Sequelize=require("sequelize");
const { sequelize } = require("../database/database");

class Post_Category extends Model{


}
Post_Category.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

},{sequelize,modelName:"PostCategory"})

module.exports=Post_Category ;