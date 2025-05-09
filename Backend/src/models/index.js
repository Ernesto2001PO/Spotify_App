const { sequelize } = require("../config/db-config");

const Album = require("./album")(sequelize);
const Genero = require("./genero")(sequelize);
const Cancion = require("./cancion")(sequelize);
const Artista = require("./artista")(sequelize);
const Usuario = require("./usuario")(sequelize);
const AuthToken = require("./authToken")(sequelize);



Album.hasMany(Cancion, {
    foreignKey: "id_album",
    as: "canciones",
});
Album.belongsTo(Artista, {
    foreignKey: "id_artista",
    as: "artista",
});


Cancion.belongsTo(Album, {
    foreignKey: "id_album",
    as: "album",
});


Artista.hasMany(Album, {
    foreignKey: "id_artista",
    as: "albums",
});


Genero.hasMany(Artista, {
    foreignKey: "id_genero",
    as: "artistas",
});


Usuario.hasMany(AuthToken, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario',
    as: 'authToken'
});

AuthToken.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario',
    as: 'usuario'
});


//Porbar relacion


// Prueba la relación
/*(async () => {
    const usuario = await Usuario.findOne({ where: { id_usuario: 1 }, include: 'authToken' });
    console.log("Prueba de relación entre Usuario y AuthToken:");
    console.log(usuario.authToken);
}
)();*/


module.exports = {
    Album,
    Genero,
    Cancion,
    Artista,
    Usuario,
    AuthToken,
    sequelize,
    Sequelize: sequelize.Sequelize

};