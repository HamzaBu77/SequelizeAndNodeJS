const SQ = require('sequelize');
const DotEnv = require('dotenv');
DotEnv.config();

// eslint-disable-next-line no-undef
const sequelizeInstance = new SQ.Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

module.exports = sequelizeInstance;
