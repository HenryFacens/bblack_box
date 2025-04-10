'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ComentarioReporte', {
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
      comentario: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addConstraint('ComentarioReporte', {
      fields: ['userId', 'reporteId'],
      type: 'unique',
      name: 'unique_user_reporte_comment'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ComentarioReporte');
  }
};
