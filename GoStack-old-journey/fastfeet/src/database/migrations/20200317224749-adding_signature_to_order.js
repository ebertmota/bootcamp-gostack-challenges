module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'signature_id', {
      type: Sequelize.INTEGER,
      references: { model: 'recipients', key: 'avatar_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'signature_id');
  },
};
