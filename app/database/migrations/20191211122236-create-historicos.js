module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('historicos', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    pacote: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'pacotes',
        key: 'id',
        as: 'pacote',
      },
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hora: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    local: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    evento: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    mensagem: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('historicos'),
};
