const Sequelize = require('sequelize');

const sequelize = Sequelize('node', 'node-complete', 'node-complete', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
