module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('deliverymen', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('deliverymen', 'avatar_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
