module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    chatid: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    nome: {
      type: DataTypes.STRING,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    usuario: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'usuarios',
  });

  return Usuario;
};
