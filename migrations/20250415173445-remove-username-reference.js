'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primeiro, remove a constraint foreign key
    await queryInterface.removeConstraint(
      'deleteUser',
      'deleteUser_userNameToBeDeleted_fkey' // nome padrão da constraint no PostgreSQL
    );

    // Depois, modifica a coluna para remover a referência
    await queryInterface.changeColumn('deleteUser', 'userNameToBeDeleted', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Restaura a foreign key constraint
    await queryInterface.changeColumn('deleteUser', 'userNameToBeDeleted', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'nome',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};