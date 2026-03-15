const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const ViajeParada = sequelize.define('ViajeParada', {
    ciudad_destino: { type: DataTypes.STRING, allowNull: false },
    orden: { type: DataTypes.INTEGER, allowNull: false }, // 1 para Coro, 2 para Punto Fijo
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: 'viaje_paradas', timestamps: false });

module.exports = ViajeParada;