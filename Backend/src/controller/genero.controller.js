const db = require("../models/")
const zod = require("zod");
const { upload } = require("../config/multer-config");


exports.getGeneros = async (req, res) => {
    try {
        const generos = await db.Genero.findAll();
        console.log("Generos encontrados:", { generos });

        res.send(generos);
    } catch (error) {
        console.error("Error al obtener los generos:", error);
        res.status(500).json({
            message: "Error al obtener los generos",
            error: error.message,
        });
    }
}

exports.getgeneroById = async (req, res) => {
    const id = req.params.id;
    try {
        const genero = await db.Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({
                message: "Genero no encontrado",
            });
        }
        
        console.log("Genero encontrado:", { genero });

        res.send(genero);
    } catch (error) {
        console.error("Error al obtener el genero:", error);
        res.status(500).json({
            message: "Error al obtener el genero",
            error: error.message,
        });
    }
}



exports.createGenero = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const { nombre } = req.body;
        try {
            const generoValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
            });
            const result = generoValidate.safeParse({ nombre });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }

            const existingGenero = await db.Genero.findOne({
                where: {
                    nombre,

                },
            });
            if (existingGenero) {
                return res.status(400).json({
                    message: "El genero ya existe",
                });
            }
            // Guardar el nuevo álbum con la ruta de la imagen
            const newGenero = await db.Genero.create({
                nombre,
                imagen: req.file ? req.file.path : null,
            });
            console.log("Genero creado:", { newGenero });
            res.status(201).json(newGenero);
        } catch (error) {
            console.error("Error al crear el genero:", error);
            if (req.file) {
                // Eliminar la imagen del servidor si hubo un error
                const imagen = require("fs");
                imagen.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error al eliminar la imagen:", err);
                    }
                }
                )
                res.status(500).json({
                    message: "Error al crear el genero",
                    error: error.message,
                });
            }
        }
    }
]


exports.updateGenero = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const id = req.params.id;
        const { nombre } = req.body;
        try {
            const generoValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
            });
            const result = generoValidate.safeParse({ nombre });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }

            const existingGenero = await db.Genero.findByPk(id);
            if (!existingGenero) {
                return res.status(404).json({
                    message: "Genero no encontrado",
                });
            }
            // Actualizar el álbum con la nueva información
            await existingGenero.update({
                nombre,
                imagen: req.file ? req.file.path : existingGenero.imagen,
            });
            console.log("Genero actualizado:", { existingGenero });
            res.status(200).json(existingGenero);
        } catch (error) {
            console.error("Error al actualizar el genero:", error);
            if (req.file) {
                // Eliminar la imagen del servidor si hubo un error
                const imagen = require("fs");
                imagen.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error al eliminar la imagen:", err);
                    }
                }
                )
                res.status(500).json({
                    message: "Error al actualizar el genero",
                    error: error.message,
                });
            }
        }
    }
]




exports.deleteGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const genero = await db.Genero.findByPk(id);
        if (!genero) {
            return res.status(404).json({
                message: "Genero no encontrado",
            });
        }
        await genero.destroy();
        console.log("Genero eliminado:", { genero });
        res.status(200).json({
            message: "Genero eliminado",
        });
    } catch (error) {
        console.error("Error al eliminar el genero:", error);
        res.status(500).json({
            message: "Error al eliminar el genero",
            error: error.message,
        });
    }
}










