const Sequelize = require('Sequelize');
const bd = new Sequelize('sgbdRP', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    baseDados: bd
};