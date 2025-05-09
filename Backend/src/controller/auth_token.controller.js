const db = require("../models/");
const zod = require("zod");
const sha1 = require("sha1");
const { where } = require("sequelize");




exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const schema = zod.object({
            email: zod.string().email().min("El email es requerido"),
            password: zod.string().min("La contraseña es requerida"),
        });

        schema.parse({ email, password });

        const existingUsuario = await db.Usuario.findOne({
            where: {
                email: email,
            },
        });
        if (existingUsuario) {
            return res.status(400).json({
                message: "El usuario ya existe",
            });
        }

        const hashedPassword = sha1(password);

        const usuario = await db.Usuario.create({
            email: email,
            password: hashedPassword,
        });

        if (!usuario) {
            return res.status(400).json({
                message: "Error al crear el usuario",
            });
        }
        console.log("Usuario creado:", { usuario });
        res.status(201).json(usuario);

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message,
        });
    }
}