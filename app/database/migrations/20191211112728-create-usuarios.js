module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('usuarios', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    chatid: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sobrenome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    usuario: {
      allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('usuarios'),
};
