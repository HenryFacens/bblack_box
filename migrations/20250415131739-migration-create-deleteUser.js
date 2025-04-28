'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deleteUser', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userNameToBeDeleted: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',        // nome da tabela referenciada
          key: 'nome',           // campo da tabela referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',     // se o user for deletado, também remove esse registro
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('deleteUser');
  }
};
