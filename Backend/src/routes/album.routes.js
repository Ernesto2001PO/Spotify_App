module.exports = (app) => {
    let router = require("express").Router();
    const albumController = require("../controller/album.controller.js");

    router.get("/album", albumController.getAlbums);
    router.get("/album/:id_artista", albumController.getAlbumByArtist); 
    router.get("/album/get/:id", albumController.getAlbumbyId);

    router.post("/album", albumController.createAlbum);
    router.put("/album/:id", albumController.updateAlbum);
    router.patch("/album/:id", albumController.patchAlbum);
    router.delete("/album/:id", albumController.deleteAlbum);


    app.use("/api", router);

}