// models/RolePermission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role');
const Permission = require('./Permission');

const RolePermission = sequelize.define('RolePermission', {
    idrol: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'idrol'
        }
    },
    idpermiso: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'idpermiso'
        }
    }
}, {
    timestamps: false,
    tableName: 'rolxpermiso'
});

module.exports = RolePermission;
