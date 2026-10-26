const Sequelize = require('sequelize');
const sequelize = require('../connection');


const PrikazBodyModel = sequelize.define(
    'prikazbody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        HeaderId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        IndividualId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        tabNumber:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        departmentOldId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        departmentNewId:{
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        postOld:{
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        postNew:{
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        salary:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        transferFrom:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        transferTo:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        numberOfContract:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },


    {
        timestamps: false,
    }

);

module.exports = PrikazBodyModel;