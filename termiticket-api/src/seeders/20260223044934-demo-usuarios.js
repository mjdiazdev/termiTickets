'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    return queryInterface.bulkInsert('usuarios', [{
      nombre: 'Admin Principal',
      email: 'admin@termiticket.com',
      password_hash: hashedPassword,
      rol: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};