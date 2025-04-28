const { DataTypes } = require("sequelize");

module.exports = function (sequelize){
  const Artista = sequelize.define(
    "Artista",
    {
      id_artista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "artista",
      timestamps: false,
    }
  );
  return Artista;
};
