module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['nome'],
      type: 'unique',
      name: 'unique_nome_constraint' // Nome da constraint, útil para remover depois
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'unique_nome_constraint');
  },
};
