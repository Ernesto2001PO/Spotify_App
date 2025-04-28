const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Album = sequelize.define(
    "Album",
    {
      id_album: {
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
      id_artista: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "album",
      timestamps: false,
    }
  );
  return Album;
};
