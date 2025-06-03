module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reporte', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reporte', 'userId');
  }
};
