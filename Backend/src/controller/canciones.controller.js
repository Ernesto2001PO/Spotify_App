const db = require("../models")
const zod = require("zod");
const { upload, getRelativePath } = require("../config/multer-config");


exports.getCanciones = async (req, res) => {
    try {
        const cancions = await db.Cancion.findAll();
        console.log("Cancions encontrados:", { cancions });

        res.send(cancions);
    } catch (error) {
        console.error("Error al obtener los cancions:", error);
        res.status(500).json({
            message: "Error al obtener los cancions",
            error: error.message,
        });
    }
}

exports.getCancionById = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.Cancion.findByPk(id);
        if (!cancion) {
            return res.status(404).json({
                message: "Cancion no encontrado",
            });
        }
        console.log("Cancion encontrado:", { cancion });

        res.send(cancion);
    } catch (error) {
        console.error("Error al obtener el cancion:", error);
        res.status(500).json({
            message: "Error al obtener el cancion",
            error: error.message,
        });
    }
}



exports.createCancion = [
    upload.single("audio"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const { nombre, id_album } = req.body;
        try {
            const cancionValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_album: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = cancionValidate.safeParse({ nombre, id_album });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }
            const album = await db.Album.findByPk(id_album);
            if (!album) {
                return res.status(404).json({
                    message: "Artista no encontrado",
                });
            }
            const existingCancion = await db.Cancion.findOne({
                where: {
                    nombre,
                    id_album
                },
            });
            if (existingCancion) {
                return res.status(400).json({
                    message: "El cancion ya existe",
                });
            }

            const audio = req.file ? getRelativePath(req.file.path) : null;


            const newCancion = await db.Cancion.create({
                nombre,
                audio,
                id_album: parseInt(id_album),
            });
            console.log("Cancion creado:", { newCancion });
            res.status(201).json(newCancion);
        } catch (error) {
            console.error("Error al crear el cancion:", error);
            if (req.file) {

                res.status(500).json({
                    message: "Error al crear el cancion",
                    error: error.message,
                });
            }
        }
    }
]


exports.updateCancion = [
    upload.single("audio"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const id = req.params.id;
        const { nombre, id_album } = req.body;
        try {
            const cancionValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_album: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = cancionValidate.safeParse({ nombre, id_album });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }
            const album = await db.Album.findByPk(id_album);
            if (!album) {
                return res.status(404).json({
                    message: "Album no encontrado",
                });
            }
            const existingCancion = await db.Cancion.findByPk(id);
            if (!existingCancion) {
                return res.status(404).json({
                    message: "Cancion no encontrado",
                });
            }

            const cancionNueva = req.file ? getRelativePath(req.file.path) : null;

            await existingCancion.update({
                nombre,
                audio: cancionNueva,
                id_album: parseInt(id_album),
            });
            console.log("Cancion actualizado:", { existingCancion });
            res.status(200).json(existingCancion);
        } catch (error) {
            console.error("Error al actualizar el cancion:", error);
            res.status(500).json({
                message: "Error al actualizar el cancion",
                error: error.message,
            });
        }
    }

]


exports.patchCancion = async (req, res) => {
    try {
        // Verificar si req.body está definido y no está vacío
        if (!req.body || !Object.keys(req.body).length) {
            return res.status(400).json({ message: "Petición inválida: No se enviaron datos" });
        }

        const { id } = req.params;
        const cancion = await db.Cancion.findByPk(id);

        // Verificar si la canción existe
        if (!cancion) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }

        // Extraer los datos del cuerpo de la petición
        const { nombre, audio, id_album } = req.body;

        // Actualizar los campos si están presentes
        if (nombre) {
            cancion.nombre = nombre;
        }
        if (audio) {
            cancion.audio = audio;
        }
        if (id_album) {
            const album = await db.Album.findByPk(id_album);
            if (!album) {
                return res.status(404).json({ message: "Álbum no encontrado" });
            }
            cancion.id_album = id_album;
        }

        // Guardar los cambios
        const cancionSaved = await cancion.save();

        // Responder con la canción actualizada
        res.status(200).json(cancionSaved);
    } catch (error) {
        console.error("Error al actualizar la canción:", error);
        res.status(500).json({
            message: "Error al actualizar la canción",
            error: error.message,
        });
    }
};

exports.deleteCancion = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.Cancion.findByPk(id);
        if (!cancion) {
            return res.status(404).json({
                message: "Cancion no encontrado",
            });
        }
        await cancion.destroy();
        console.log("Cancion eliminado:", { cancion });
        res.status(200).json({
            message: "Cancion eliminado",
        });
    } catch (error) {
        console.error("Error al eliminar el cancion:", error);
        res.status(500).json({
            message: "Error al eliminar el cancion",
            error: error.message,
        });
    }
}










