'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reporte', 'categoriaReporte', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Não classificado'
    });

    await queryInterface.addColumn('reporte', 'statusReporte', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pendente'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reporte', 'categoriaReporte');
    await queryInterface.removeColumn('reporte', 'statusReporte');
  }
};
