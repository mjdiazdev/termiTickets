const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;
const Viaje = sequelize.define('Viaje', {
    ciudad_origen: { type: DataTypes.STRING, defaultValue: 'Barquisimeto' },
    fecha_salida: { type: DataTypes.DATE, allowNull: false },
    estado: { 
        type: DataTypes.ENUM('PROGRAMADO', 'EN_RUTA', 'FINALIZADO', 'CANCELADO'),
        defaultValue: 'PROGRAMADO' 
    }
}, { tableName: 'viajes' });

module.exports = Viaje;