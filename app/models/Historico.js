module.exports = (sequelize, DataTypes) => {
  const Historico = sequelize.define('Historico',
    {
      pacote: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Pacote',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      data: {
        type: DataTypes.STRING,
      },
      hora: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
      evento: {
        type: DataTypes.STRING,
      },
      mensagem: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'historicos',
    });

  return Historico;
};
