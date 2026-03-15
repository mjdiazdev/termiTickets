require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Exportamos un objeto que contiene todo
module.exports = {
  development: config,
  test: config,
  production: config,
  sequelize: sequelize // La instancia va aquí
};