'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertar Personal
    await queryInterface.bulkInsert('personal', [
      { nombre: 'Carlos Rodríguez', cedula: 'V-10222333', rol: 'CHOFER', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'José Altuve', cedula: 'V-15444555', rol: 'COLECTOR', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Insertar Vehículos
    return queryInterface.bulkInsert('vehiculos', [
      { placa: 'AB123CD', capacidad_maxima: 32, marca: 'Encava', createdAt: new Date(), updatedAt: new Date() },
      { placa: 'XY789ZT', capacidad_maxima: 15, marca: 'Iveco Daily', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('personal', null, {});
    await queryInterface.bulkDelete('vehiculos', null, {});
  }
};