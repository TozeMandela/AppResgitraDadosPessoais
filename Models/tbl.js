const bd = require('./BD');
const data_Of_People = bd.baseDados.define(
    'data_Of_People', { 
        nome :{
            type: bd.Sequelize.STRING
        },
        sobrenome :{
            type: bd.Sequelize.STRING
        },
        email :{
            type: bd.Sequelize.STRING
        },
        senha :{
            type: bd.Sequelize.INTEGER
        },
        informacao :{
            type: bd.Sequelize.TEXT
        },
        profissao :{
            type: bd.Sequelize.STRING
        },
        data_nasc :{
            type: bd.Sequelize.DATE
        }

    }
);

//data_Of_People.sync({force:true});

module.exports = data_Of_People;