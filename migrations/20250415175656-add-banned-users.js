'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BannedUsers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UserNameBanned: {
        type: Sequelize.STRING,
        allowNull: false
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      banExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      reason: {
        type: Sequelize.ENUM('post', 'comentario', 'outros'),
        allowNull: false
      },
      reporteId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      blockCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BannedUsers');
    // Removendo o tipo ENUM
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_BannedUsers_reason";');
  }
};