const db = require("../models/")
const zod = require("zod");
const { upload } = require("../config/multer-config");


exports.getArtistas = async (req, res) => {
    try {
        const artistas = await db.Artista.findAll();
        console.log("Artistas encontrados:", { artistas });

        res.send(artistas);
    } catch (error) {
        console.error("Error al obtener los artistas:", error);
        res.status(500).json({
            message: "Error al obtener los artistas",
            error: error.message,
        });
    }
}

exports.getArtistaByGeneroId = async (req, res) => {
    const id = req.params.id;
    try {
        const artista = await db.Artista.findAll()({
            where: {
                id_genero: id
            }
        });
        if (!artista) {
            return res.status(404).json({
                message: "Artista no encontrado",
            });
        }
        res.send(artista);
    } catch (error) {
        console.error("Error al obtener el artista:", error);
        res.status(500).json({
            message: "Error al obtener el artista",
            error: error.message,
        });
    }
}



exports.createArtista = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const { nombre, id_genero } = req.body;
        try {
            const artistaValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_genero: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = artistaValidate.safeParse({ nombre, id_genero });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }


            const genero = await db.Genero.findByPk(id_genero);
            if (!genero) {
                return res.status(404).json({
                    message: "Genero no encontrado",
                });
            }

            const existingArtista = await db.Artista.findOne({
                where: {
                    nombre,
                    id_genero,
                },
            });
            if (existingArtista) {
                return res.status(400).json({
                    message: "El artista ya existe",
                });
            }
            // Guardar el nuevo álbum con la ruta de la imagen
            const newArtista = await db.Artista.create({
                nombre,
                imagen: req.file ? req.file.path : null,
                id_genero: parseInt(id_genero),
            });
            console.log("Artista creado:", { newArtista });
            res.status(201).json(newArtista);
        } catch (error) {
            console.error("Error al crear el artista:", error);
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
                    message: "Error al crear el artista",
                    error: error.message,
                });
            }
        }
    }
]


exports.updateArtista = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const id = req.params.id;
        const { nombre, id_genero } = req.body;
        try {
            const artistaValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_genero: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = artistaValidate.safeParse({ nombre, id_genero });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }
            const genero = await db.Genero.findByPk(id_genero);
            if (!genero) {
                return res.status(404).json({
                    message: "Artista no encontrado",
                });
            }

            const existingArtista = await db.Artista.findByPk(id);
            if (!existingArtista) {
                return res.status(404).json({
                    message: "Artista no encontrado",
                });
            }
            // Actualizar el álbum con la nueva información
            await existingArtista.update({
                nombre,
                imagen: req.file ? req.file.path : existingArtista.imagen,
                id_genero: parseInt(id_genero),
            });
            console.log("Artista actualizado:", { existingArtista });
            res.status(200).json(existingArtista);
        } catch (error) {
            console.error("Error al actualizar el artista:", error);
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
                    message: "Error al actualizar el artista",
                    error: error.message,
                });
            }
        }
    }
]


exports.patchArtista = async (req, res) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { id } = req.params;
    const artista = await db.Artista.findByPk(id);
    if (!artista) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    const { nombre, imagen, id_genero } = req.body;
    if (nombre) {
        artista.nombre = nombre;
    }
    if (imagen) {
        artista.imagen = imagen;
    }
    if (id_genero) {
        artista.id_genero = id_genero;
    }

    const artistaSaved = await artista.save();
    if (!artistaSaved) {
        res.status(500).send({ message: "Error al editar la persona" });
        return;
    }
    res.send(artistaSaved);
}


exports.deleteArtista = async (req, res) => {
    const id = req.params.id;
    try {
        const artista = await db.Artista.findByPk(id);
        if (!artista) {
            return res.status(404).json({
                message: "Artista no encontrado",
            });
        }
        await artista.destroy();
        console.log("Artista eliminado:", { artista });
        res.status(200).json({
            message: "Artista eliminado",
        });
    } catch (error) {
        console.error("Error al eliminar el artista:", error);
        res.status(500).json({
            message: "Error al eliminar el artista",
            error: error.message,
        });
    }
}










