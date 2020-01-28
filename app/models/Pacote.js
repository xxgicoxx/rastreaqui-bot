module.exports = (sequelize, DataTypes) => {
  const Pacote = sequelize.define('Pacote', {
    nome: {
      type: DataTypes.STRING,
    },
    usuario: {
      type: DataTypes.INTEGER,
    },
    codigo: {
      type: DataTypes.STRING,
    },
    rastrear: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    visivel: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: 'pacotes',
  });

  return Pacote;
};
