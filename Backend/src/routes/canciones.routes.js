module.exports = (app) => {
    const router = require("express").Router();
    const CancionController = require("../controller/canciones.controller.js");


    router.get("/cancion", CancionController.getCanciones);
    router.get("/cancion/:id", CancionController.getCancionById);
    router.post("/cancion", CancionController.createCancion);
    router.put("/cancion/:id", CancionController.updateCancion);
    router.patch("/cancion/:id", CancionController.patchCancion);
    router.delete("/cancion/:id", CancionController.deleteCancion);



    app.use("/api", router);






}