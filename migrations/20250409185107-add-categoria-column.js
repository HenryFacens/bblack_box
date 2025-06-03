'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoriasReporte: {
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

    // Inserção das categorias padrão
    await queryInterface.bulkInsert('categoria', [
      { categoriasReporte: 'Infraestrutura Urbana', createdAt: new Date(), updatedAt: new Date() },
      { categoriasReporte: 'Limpeza e Meio Ambiente', createdAt: new Date(), updatedAt: new Date() },
      { categoriasReporte: 'Segurança Pública', createdAt: new Date(), updatedAt: new Date() },
      { categoriasReporte: 'Transporte e Mobilidade', createdAt: new Date(), updatedAt: new Date() },
      { categoriasReporte: 'Outros', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categoria');
  }
};
