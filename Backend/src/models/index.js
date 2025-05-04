const { sequelize } = require("../config/db-config");

const Album = require("./album")(sequelize);
const Genero = require("./genero")(sequelize);
const Cancion = require("./cancion")(sequelize);
const Artista = require("./artista")(sequelize);

module.exports = {
    Album,
    Genero,
    Cancion,
    Artista,
    sequelize,
};

// Configurar las asociaciones entre los modelos
Album.associate = (models) => {
    Album.hasMany(models.Cancion, {
        foreignKey: "id_album",
        as: "canciones", // Alias para incluir canciones relacionadas
    });
    Album.belongsTo(models.Artista, {
        foreignKey: "id_artista",
        as: "artista", // Alias para incluir el artista relacionado
    });
};

Cancion.associate = (models) => {
    Cancion.belongsTo(models.Album, {
        foreignKey: "id_album",
        as: "album", // Alias para incluir el álbum relacionado
    });
};

Artista.associate = (models) => {
    Artista.hasMany(models.Album, {
        foreignKey: "id_artista",
        as: "albums", 
    });
};

Genero.associate = (models) => {
    Genero.hasMany(models.Artista, {
        foreignKey: "id_genero",
        as: "artistas", 
    });
};

// Inicializar las asociaciones
const models = { Album, Genero, Cancion, Artista };
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    ...models,
    sequelize,
};