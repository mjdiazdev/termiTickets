'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pasajeros', [
      {
        cedula: 'V-20123456',
        nombre: 'Ana García',
        telefono: '0414-1234567',
        // Nota: Si no agregaste timestamps a la tabla pasajeros, 
        // puedes omitir estas dos líneas:
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cedula: 'V-25987654',
        nombre: 'Luis Martínez',
        telefono: '0412-7654321',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pasajeros', null, {});
  }
};