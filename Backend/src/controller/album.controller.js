const db = require("../models/")
const zod = require("zod");
const { upload, getRelativePath } = require("../config/multer-config");


exports.getAlbums = async (req, res) => {
    try {
        const albums = await db.Album.findAll();
        console.log("Albums encontrados:", { albums });

        res.send(albums);
    } catch (error) {
        console.error("Error al obtener los albums:", error);
        res.status(500).json({
            message: "Error al obtener los albums",
            error: error.message,
        });
    }
}

exports.getAlbumByArtist = async (req, res) => {
    const { id_artista } = req.params;
    try {
        const albums = await db.Album.findAll({
            where: { id_artista: id_artista },
            include: [
                {
                    model: db.Cancion,
                    as: "canciones",
                    attributes: ["id_cancion", "nombre", "audio"],
                },
            ],
        });

        console.log("Valor de id_album:", id_artista);
        console.log("Albums encontrados por artistas:", { albums });
        res.send(albums);
    } catch (error) {
        console.error("Error al obtener los album por género:", error);
        res.status(500).json({
            message: "Error al obtener los albu, por género",
            error: error.message,
        });
    }
}
exports.getAlbumbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.Album.findByPk(id);
        if (!album) {
            return res.status(404).json({
                message: "Album no encontrado",
            });
        }
        console.log("Album encontrado:", { album });

        res.send(album);
    } catch (error) {
        console.error("Error al obtener el album:", error);
        res.status(500).json({
            message: "Error al obtener el album",
            error: error.message,
        });
    }
}

exports.createAlbum = async (req, res) => {
    const { nombre, imagen, id_artista } = req.body;
    try {

        const albumValidate = zod.object({
            nombre: zod.string().min(1, "El nombre es requerido"),
            imagen: zod.string().min(1, "La imagen es requerida"),
            id_artista: zod.number().int().positive("El id del artista debe ser un número positivo")
        });
        const result = albumValidate.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Error de validación",
                errors: result.error.errors,
            });
        }
        // Verificar si el artista existe
        const artista = await db.Artista.findByPk(id_artista);
        if (!artista) {
            return res.status(404).json({
                message: "Artista no encontrado",
            });
        }
        const existingAlbum = await db.Album.findOne({
            where: {
                nombre,
                id_artista
            }
        });
        if (existingAlbum) {
            return res.status(400).json({
                message: "El album ya existe",
            });
        }

        const imagen = req.file ? getRelativePath(req.file.path) : null;

        const newAlbum = await db.Album.create({
            nombre,
            imagen,
            id_artista
        });
        console.log("Album creado:", { newAlbum });

        res.status(201).json(newAlbum);
    } catch (error) {
        console.error("Error al crear el album:", error);
        res.status(500).json({
            message: "Error al crear el album",
            error: error.message,
        });
    }
}


exports.createAlbum = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const { nombre, id_artista } = req.body;
        try {
            const albumValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_artista: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = albumValidate.safeParse({ nombre, id_artista });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }
            const artista = await db.Artista.findByPk(id_artista);
            if (!artista) {
                return res.status(404).json({
                    message: "Artista no encontrado",
                });
            }
            const existingAlbum = await db.Album.findOne({
                where: {
                    nombre,
                    id_artista
                },
            });
            if (existingAlbum) {
                return res.status(400).json({
                    message: "El album ya existe",
                });
            }

            const imagen = req.file ? getRelativePath(req.file.path) : null;


            const newAlbum = await db.Album.create({
                nombre,
                imagen,
                id_artista: parseInt(id_artista),
            });
            console.log("Album creado:", { newAlbum });
            res.status(201).json(newAlbum);
        } catch (error) {
            console.error("Error al crear el album:", error);
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
                    message: "Error al crear el album",
                    error: error.message,
                });
            }
        }
    }
]


exports.updateAlbum = [
    upload.single("imagen"), // Middleware para procesar el archivo con el campo "imagen"
    async (req, res) => {
        const id = req.params.id;
        const { nombre, id_artista } = req.body;
        try {
            const albumValidate = zod.object({
                nombre: zod.string().min(1, "El nombre es requerido"),
                id_artista: zod.string().min("El id del artista debe ser un número positivo"),
            });
            const result = albumValidate.safeParse({ nombre, id_artista });
            if (!result.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: result.error.errors,
                });
            }
            const artista = await db.Artista.findByPk(id_artista);
            if (!artista) {
                return res.status(404).json({
                    message: "Artista no encontrado",
                });
            }
            const existingAlbum = await db.Album.findByPk(id);
            if (!existingAlbum) {
                return res.status(404).json({
                    message: "Album no encontrado",
                });
            }

            const nuevaImagen = req.file ? getRelativePath(req.file.path) : null;

            // Actualizar el álbum con la nueva información
            await existingAlbum.update({
                nombre,
                imagen: nuevaImagen,
                id_artista: parseInt(id_artista),
            });
            console.log("Album actualizado:", { existingAlbum });
            res.status(200).json(existingAlbum);
        } catch (error) {
            console.error("Error al actualizar el album:", error);
            if (req.file) {
                const imagen = require("fs");
                imagen.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error al eliminar la imagen:", err);
                    }
                }
                )
                res.status(500).json({
                    message: "Error al actualizar el album",
                    error: error.message,
                });
            }
        }
    }
]
exports.patchAlbum = async (req, res) => {
    if (!req.body) {
        return { errors: { message: "Petición inválida" } };
    }
    const { id } = req.params;
    const album = await db.Album.findByPk(id);
    if (!album) {
        return res.status(404).send({ message: 'Persona no encontrada' });
    }
    const { nombre, imagen, id_artista } = req.body;
    if (nombre) {
        album.nombre = nombre;
    }
    if (imagen) {
        album.imagen = imagen;
    }
    if (id_artista) {
        album.id_artista = id_artista;
    }

    const albumSaved = await album.save();
    if (!albumSaved) {
        res.status(500).send({ message: "Error al editar la persona" });
        return;
    }
    res.send(albumSaved);
}


exports.deleteAlbum = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.Album.findByPk(id);
        if (!album) {
            return res.status(404).json({
                message: "Album no encontrado",
            });
        }
        await album.destroy();
        console.log("Album eliminado:", { album });
        res.status(200).json({
            message: "Album eliminado",
        });
    } catch (error) {
        console.error("Error al eliminar el album:", error);
        res.status(500).json({
            message: "Error al eliminar el album",
            error: error.message,
        });
    }
}










