const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const Pasajero = sequelize.define('Pasajero', {
    cedula: { type: DataTypes.STRING, unique: true, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    telefono: DataTypes.STRING
}, { tableName: 'pasajeros', timestamps: false });

module.exports = Pasajero;