// models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Role = sequelize.define('Role', {
    idrol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomrol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'rol'
});

module.exports = Role;