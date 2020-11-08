const Sequelize = require("sequelize").Sequelize;
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);

const sequelize=new Sequelize("etoqciua","etoqciua","Xypr6nLKiaVIY96wIrPCATNj_ZR8tlRy" ,{
    host: 'lallah.db.elephantsql.com',
    dialect: "postgres"

});

const sequelizeSessionStore = new SessionStore({//Session Save
    db: sequelize,
    expiration:120000,
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

module.exports={
    connect,
    sync,
    sequelize,
    sequelizeSessionStore
};