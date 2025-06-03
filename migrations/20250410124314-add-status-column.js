'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusReporte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Inserção dos status padrão
    await queryInterface.bulkInsert('status', [
      { statusReporte: 'Pendente', createdAt: new Date(), updatedAt: new Date() },
      { statusReporte: 'Em andamento', createdAt: new Date(), updatedAt: new Date() },
      { statusReporte: 'Resolvido', createdAt: new Date(), updatedAt: new Date() },
      { statusReporte: 'Fechado sem solução', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('status');
  }
};
