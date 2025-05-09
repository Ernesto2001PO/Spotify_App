module.exports = app => {
    require("./album.routes")(app);
    require("./artista.routes")(app);
    require("./genero.routes")(app);
    require("./canciones.routes")(app);
    require("./auth_token.routes")(app);



};