const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");

class Category extends Model {

}

Category.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
},{sequelize,modelName:"Category",comment:"Categories"})

module.exports = Category;