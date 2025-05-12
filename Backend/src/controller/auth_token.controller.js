const db = require("../models/");
const zod = require("zod");
const { generateToken, hashingPassword } = require("../utils/tokenUtils");
const usuario = require("../models/usuario");




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

        const hashedPassword = hashingPassword(password);


        // Crear el usuario en la base de datos
        const newUsuario = await db.Usuario.create({
            email: email,
            password: hashedPassword,
        });


        console.log("Usuario creado:", { usuario });

        res.status(201).json({
            message: "Usuario creado exitosamente",
            usuario: {
                id: newUsuario.id,
                email: newUsuario.email,
            },
        });

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message,
        });
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "El email y la contraseña son requeridos",
            });
        }

        const existingUsuario = await db.Usuario.findOne({
            where: {
                email: email,
            },
        });
        if (!existingUsuario) {
            return res.status(400).json({
                message: "El usuario no existe",
            });
        }

        const hashedPassword = hashingPassword(password);

        const usuario = await db.Usuario.findOne({
            where: {
                email: email,
                password: hashedPassword,
            },
        });

        if (!usuario) {
            return res.status(401).json({
                message: "Credenciales inválidas",
            });
        }

        // Generar un nuevo token
        const token = generateToken(usuario.id);

        // Guardar el token en la base de datos
        await db.AuthToken.create({
            id_usuario: usuario.id_usuario,
            token: token,
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token,
            usuario: {
                id: usuario.id,
                email: usuario.email,
            },
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message,
        });
    }
}