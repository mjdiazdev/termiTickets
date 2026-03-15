const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/config'); // Asegúrate que exportas { sequelize }
const db = {};

// 1. Cargar archivos usando __dirname
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

// 2. Definir las relaciones (Rescatando tu lógica anterior)
// Usamos db[Nombre] para asegurar que existen antes de asociar

if (db.Viaje) {
    db.Viaje.belongsTo(db.Personal, { as: 'chofer', foreignKey: 'chofer_id' });
    db.Viaje.belongsTo(db.Personal, { as: 'colector', foreignKey: 'colector_id' });
    db.Viaje.belongsTo(db.Vehiculo, { foreignKey: 'vehiculo_id' });
}

if (db.Viaje && db.ViajeParada) {
    db.Viaje.hasMany(db.ViajeParada, { as: 'paradas', foreignKey: 'viaje_id' });
    db.ViajeParada.belongsTo(db.Viaje, { foreignKey: 'viaje_id' });
}

if (db.Boleto) {
    db.Boleto.belongsTo(db.Factura, { foreignKey: 'factura_id' });
    db.Boleto.belongsTo(db.Pasajero, { foreignKey: 'pasajero_id' });
    db.Boleto.belongsTo(db.ViajeParada, { foreignKey: 'viaje_parada_id' });
}

if (db.Factura) {
    db.Factura.hasMany(db.Boleto, { foreignKey: 'factura_id' });
    // Nota: Asegúrate que tu modelo de usuario se llame 'User' o 'Usuario'
    if (db.User) db.Factura.belongsTo(db.User, { as: 'vendedor', foreignKey: 'usuario_vendedor_id' });
    else if (db.Usuario) db.Factura.belongsTo(db.Usuario, { as: 'vendedor', foreignKey: 'usuario_vendedor_id' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;