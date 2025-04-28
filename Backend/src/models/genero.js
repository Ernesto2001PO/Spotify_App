const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Genero = sequelize.define(
    "Genero",
    {
      id_genero: {
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
    },
    {
      tableName: "genero",
      timestamps: false,
    }
  );
  return Genero;
};
