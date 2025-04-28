const { DataTypes } = require("sequelize");

module.exports = function (sequelize){
  const Cancion = sequelize.define(
    "Cancion",
    {
      id_cancion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      audio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_album: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cancion",
      timestamps: false,
    }
  );
  return Cancion;
};
