module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('commands', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    command: {
      allowNull: false,
      type: DataTypes.STRING(120),
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(120),
    },
  }, {
    tableName: 'commands',
    timestamps: false,
  }),

  down: (queryInterface) => queryInterface.dropTable('commands'),
};
