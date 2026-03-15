const { DataTypes } = require('sequelize');
// Importamos el archivo completo
const dbConfig = require('../config/config');

// Extraemos la instancia de forma segura
const sequelize = dbConfig.sequelize || dbConfig;

const Boleto = sequelize.define('Boleto', {
    precio_pagado: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.ENUM('VALIDO', 'USADO', 'ANULADO'), 
        defaultValue: 'VALIDO' 
    }
}, { 
    tableName: 'boletos',
    timestamps: true // Asegúrate de que esto coincida con lo que hicimos en la BD
});

module.exports = Boleto;