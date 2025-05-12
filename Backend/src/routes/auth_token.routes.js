module.exports = (app) => {
    let router = require("express").Router();
    const authTokenController = require("../controller/auth_token.controller.js");

    router.post("/register", authTokenController.register);
    router.post("/login", authTokenController.login);


    app.use("/token", router);

}