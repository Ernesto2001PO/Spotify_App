const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/");
const port = process.env.PORT || 3000;



app.use(express.json());



// Cargar relaciones
require("./models/relations")

// Cargar rutas
require("./routes/index")(app);


db.sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

