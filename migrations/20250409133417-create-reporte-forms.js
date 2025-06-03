'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reporte', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fotoPerfil: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      nomePerfil: {
        type: Sequelize.STRING,
        allowNull: false
      },
      horarioReporte: {
        type: Sequelize.DATE,
        allowNull: false
      },
      localizacaoReporte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricaoReporte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imagemReporte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avaliacaoReporte: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 5
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reporte');
  }
};
