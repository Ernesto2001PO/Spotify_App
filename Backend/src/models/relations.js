const { Album, Genero, Cancion, Artista } = require("./index")


// Relacion: Un genero pertenece a un artista

Genero.associate = (models) => {
    Genero.belongsTo(models.Artista, {
        foreignKey: "id_artista",
        as: "artista",
        onDelete: "CASCADE",        
    });
}


// Un artista tiene varios generos

Artista.associate = (models) => {
    Artista.hasmany(models.Genero, {
        foreignKey: "id_genero",
        as: "artista",
        onDelete: "CASCADE",
    });
}





