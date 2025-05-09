const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {

    const AuthToken = sequelize.define(
        'AuthToken',
        {
            id_token: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },

        }, {
        tableName: 'auth_token',
        timestamps: false
    });
    return AuthToken;
}


