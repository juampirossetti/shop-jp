const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'node-complete', 'node-complete', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
