module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('pacotes', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nome: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    usuario: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    codigo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rastrear: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    visivel: {
      allowNull: false,
      type: DataTypes.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable('pacotes'),
};
