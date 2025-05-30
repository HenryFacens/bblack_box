module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Reportes', 'impactoIDH', {
      type: Sequelize.FLOAT, // ou Sequelize.INTEGER, conforme sua necessidade
      allowNull: true,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Reportes', 'impactoIDH');
  }
};