const Sequelize = require('sequelize');
const sequelize = require('../connection');


const ProxyHeaderModel = sequelize.define(
    'proxyheader',
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
        dischargeDate:{
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        individualId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
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

module.exports = ProxyHeaderModel;