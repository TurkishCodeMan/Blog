const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");

class User extends Model {
    //Functions
}
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,



}, { sequelize, comment: "First User Table", modelName: "user" });

module.exports = User;