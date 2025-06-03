'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InteracoesReporte', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      reporteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'reporte', key: 'id' },
        onDelete: 'CASCADE'
      },
      tipo: { // 'like' ou 'dislike'
        type: Sequelize.ENUM('like', 'dislike'),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addConstraint('InteracoesReporte', {
      fields: ['userId', 'reporteId'],
      type: 'unique',
      name: 'unique_user_reporte_interaction'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InteracoesReporte');
  }
};
