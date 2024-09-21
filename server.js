const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const axios = require('axios');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;
// Habilitar CORS
app.use(cors());
// Middleware para analizar el body
app.use(bodyParser.json());

// Configurar limitador de tasa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // limitar cada IP a 100 solicitudes por ventana
});

// Aplicar el limitador a todas las solicitudes
app.use(limiter);

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",   // Tu usuario de MySQL (puede ser 'root')
    password: "",   // Tu contraseña de MySQL (déjala vacía si no tienes)
    database: "jive"  // Nombre de tu base de datos
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Función para verificar reCAPTCHA
async function verificarReCaptcha(token) {
    const secretKey = "6LedOUsqAAAAALgMiCCbv6iRCIXhIdZxLt5utv07";
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await axios.post(verificationURL);
        return response.data.success;
    } catch (error) {
        console.error("Error al verificar reCAPTCHA:", error);
        return false;
    }
}

// Ruta para manejar el registro
app.post("/registrar", async(req, res) => {
    const { nombreTutor, nombreJugador, contraseña, correo, edadJugador, recaptchaToken } = req.body;
    
    // Verificar reCAPTCHA
    const reCaptchaValido = await verificarReCaptcha(recaptchaToken);
    if (!reCaptchaValido) {
        return res.status(400).json({ message: "Verificación reCAPTCHA fallida" });
    }
    try {
        // Encriptar contraseña y respuesta de seguridad
        const saltRounds = 10;
        const hashContraseña = await bcrypt.hash(contraseña, saltRounds);
    const query = "INSERT INTO usuarios (nombreTutor, nombreJugador, contraseña, correo, edadJugador) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nombreTutor, nombreJugador, contraseña, correo, edadJugador], (err, result) => {
        if (err) {
            console.error("Error al insertar datos:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: "El correo electrónico ya está registrado" });
                }
                return res.status(500).json({ message: "Error en el servidor" });
            }
            res.status(201).json({ message: "Registro exitoso" });
        });
    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
