module.exports = app => {
    require("./album.routes")(app);
    require("./artista.routes")(app);
    require("./genero.routes")(app);
    require("./canciones.routes")(app);
    



};