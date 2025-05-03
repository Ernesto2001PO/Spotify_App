module.exports = (app) => {
    let router = require("express").Router();
    const artistaController = require("../controller/artista.controller.js");

    router.get("/artista", artistaController.getArtistas);
    router.get("/artista/:id", artistaController.getArtistaByGeneroId);
    router.post("/artista", artistaController.createArtista);
    router.put("/artista/:id", artistaController.updateArtista);
    router.patch("/artista/:id", artistaController.patchArtista);
    router.delete("/artista/:id", artistaController.deleteArtista);


    app.use("/api", router);

}