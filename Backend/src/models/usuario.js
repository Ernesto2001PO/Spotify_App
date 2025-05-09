const { DataTypes } = require('sequelize');


module.exports = function (sequelize) {
    const Usuario = sequelize.define(
        'Usuario',
        {
            id_usuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'usuario',
            timestamps: false,
        }
    );

    return Usuario;
}

// relations
