const { DataTypes } = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = dbConfig.sequelize || dbConfig;

const Factura = sequelize.define('Factura', {
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    metodo_pago: { 
        type: DataTypes.ENUM('EFECTIVO', 'PAGO_MOVIL', 'PUNTO_VENTA', 'DOLARES'),
        allowNull: false 
    }
}, { tableName: 'facturas' });

module.exports = Factura;