const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");


class Commit extends Model{

}

Commit.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    description:{
        type:Sequelize.STRING(1200)
    }
},{ sequelize, comment: "Commit Table", modelName: "commit" })

module.exports=Commit;