const Sequelize = require('sequelize');

const sequelize = new Sequelize('kursmania', 'root', '', {
   host: 'localhost',
   dialect: 'mysql' 
});

module.exports = sequelize;