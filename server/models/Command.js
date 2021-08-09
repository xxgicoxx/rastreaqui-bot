module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define('Command', {
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
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: 'commands',
    timestamps: false,
  });

  return Command;
};
