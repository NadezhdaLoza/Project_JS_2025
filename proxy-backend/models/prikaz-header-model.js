const Sequelize = require('sequelize');
const sequelize = require('../connection');


const PrikazHeaderModel = sequelize.define(
    'prikazheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dateOfCreate:{
            type: Sequelize.DATE,
            allowNull: false
        },
        organizationId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },


    {
        timestamps: false,
    }

);

module.exports = PrikazHeaderModel;