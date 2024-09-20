const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
// Habilitar CORS
app.use(cors());
// Middleware para analizar el body
app.use(bodyParser.json());

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

// Ruta para manejar el registro
app.post("/registrar", (req, res) => {
    const { nombreTutor, nombreJugador, contraseña, correo, edadJugador } = req.body;

    const query = "INSERT INTO usuarios (nombreTutor, nombreJugador, contraseña, correo, edadJugador) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nombreTutor, nombreJugador, contraseña, correo, edadJugador], (err, result) => {
        if (err) {
            console.error("Error al insertar datos:", err);
            res.json({ message: "Error al registrar" });
            return;
        }
        res.json({ message: "Registro exitoso" });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
