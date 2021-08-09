module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('objects', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING(120),
    },
    user: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(13),
    },
    events: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'objects',
    timestamps: false,
  }),

  down: (queryInterface) => queryInterface.dropTable('objects'),
};
