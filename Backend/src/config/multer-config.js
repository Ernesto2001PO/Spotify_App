const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuración de multer con carpetas dinámicas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determinar el tipo de recurso basado en la ruta de la solicitud
        let folderName = "default"; // Carpeta por defecto
        // Detectar qué recurso estamos manejando basado en la URL o alguna propiedad de req
        if (req.originalUrl.includes('/album')) {
            folderName = "album";
        } else if (req.originalUrl.includes('/artista')) {
            folderName = "artista";
        } else if (req.originalUrl.includes('/cancione')) {
            folderName = "canciones";
        } else if (req.originalUrl.includes('/genero')) {
            folderName = "genero";
        }

        // Crear la carpeta si no existe
        const uploadPath = path.join(__dirname, "../../uploads/", folderName);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Nombre único para evitar colisiones
    },
});

// Middleware de multer
const upload = multer({ storage });

module.exports = { upload };