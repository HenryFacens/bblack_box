'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', 'users_fotoPerfil_key');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('users', ['fotoPerfil'], {
      unique: true,
      name: 'users_fotoPerfil_key'
    });
  }
};
