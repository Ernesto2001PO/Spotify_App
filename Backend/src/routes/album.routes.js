module.exports = (app) => {
    let router = require("express").Router();
    const albumController = require("../controller/album.controller.js");

    router.get("/album", albumController.getAlbums);
    router.get("/album/:id", albumController.getAlbumById);
    router.post("/album", albumController.createAlbum);


    router.put("/album/:id", albumController.updateAlbum);
    router.patch("/album/:id", albumController.patchAlbum);
    router.delete("/album/:id", albumController.deleteAlbum);


    app.use("/api", router);

}