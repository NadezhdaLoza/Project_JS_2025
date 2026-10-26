const Sequelize = require('sequelize');
const sequelize = require('../connection');


const IndividualModel = sequelize.define(
    'individual',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        patronymic: {
            type: Sequelize.STRING(25),
            default: null,
        },
        issued: {
            type: Sequelize.STRING(80),
            allowNull: false,
        },
        series: {
            type: Sequelize.STRING(4),
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING(6),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }

);

module.exports = IndividualModel;