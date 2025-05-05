module.exports = (app) => {
    let router = require("express").Router();
    const generoController = require("../controller/genero.controller.js");

    router.get("/genero", generoController.getGeneros);
    router.get("/genero/get/:id", generoController.getgeneroById);

    router.post("/genero", generoController.createGenero);
    router.put("/genero/:id", generoController.updateGenero);
    router.delete("/genero/:id", generoController.deleteGenero);


    app.use("/api", router);

}