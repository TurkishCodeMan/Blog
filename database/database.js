const Sequelize = require("sequelize").Sequelize;
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);

const sequelize = new Sequelize("ddc8dqdvotr9id", "vwoxgosdgpiaig", "107b2dccde3834ac287ccde510808057512154d0940ecf7c5e592431263e2a34", {
    host: 'ec2-52-86-116-94.compute-1.amazonaws.com',
    dialect: "postgres",
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
   

});


const sequelizeSessionStore = new SessionStore({//Session Save
    db: sequelize,
    expiration: 120000,
});

var connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected To Database !")
    } catch (error) {
        console.log(error.message);
    }
};

var sync = async () => {
    try {
        await sequelize.sync();
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    connect,
    sync,
    sequelize,
    sequelizeSessionStore
};