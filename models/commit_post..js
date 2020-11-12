const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");


class CommitPost extends Model{

}

CommitPost.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
},{ sequelize, comment: "Commit_Post Table", modelName: "commit_post" })

module.exports=CommitPost;