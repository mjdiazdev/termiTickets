const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const Vehiculo = sequelize.define('Vehiculo', {
    placa: { type: DataTypes.STRING, unique: true, allowNull: false },
    capacidad_maxima: { type: DataTypes.INTEGER, allowNull: false },
    marca: DataTypes.STRING,
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'vehiculos' });

module.exports = Vehiculo;