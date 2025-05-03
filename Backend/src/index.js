const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models/");
const port = process.env.PORT || 3000;


// El .env es para cargar las variables de entorno desde el archivo .env

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


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

