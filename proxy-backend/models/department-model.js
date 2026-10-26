const Sequelize = require('sequelize');
const sequelize = require('../connection');


const DepartmentModel = sequelize.define(
    'department',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        classOfWorkingConditions: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        startTimeOfWorkingDay: {
            type: Sequelize.TIME,
            default: null,
        },
        endTimeOfWorkingDay: {
            type: Sequelize.TIME,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }

);

module.exports = DepartmentModel;