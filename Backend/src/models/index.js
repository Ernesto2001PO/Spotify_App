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
