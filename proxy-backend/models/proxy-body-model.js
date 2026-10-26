const Sequelize = require('sequelize');
const sequelize = require('../connection');


const ProxyBodyModel = sequelize.define(
    'proxybody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 1,
        },
        unit: {
            type: Sequelize.STRING(8),
            allowNull: false,
        },
        proxyHeaderId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            
            references: {
                model: 'proxyheaders', 
                key: 'id'
            }
        },
        productId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },


    {
        timestamps: false,
    }

);

module.exports = ProxyBodyModel;