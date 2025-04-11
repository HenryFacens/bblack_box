'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('notifications', 'reportId', 'reporteId');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('notifications', 'reporteId', 'reportId');
  }
};
