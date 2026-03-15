const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const Personal = sequelize.define('Personal', {
    cedula: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('CHOFER', 'COLECTOR'),
        allowNull: false
    },
    telefono: DataTypes.STRING,
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'personal',
    timestamps: true // Esto nos crea 'createdAt' y 'updatedAt' automáticamente
});

module.exports = Personal;